import axios, { AxiosError } from "axios";
import { makeRedirectUri } from "expo-auth-session";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../zustand/auth";
import { useUserStore } from "../../zustand/user";

const callbackUrl = makeRedirectUri({
  scheme: "minispace-mobile",
});

interface AuthenticationProps {
  hideAuth: () => void;
}

const Authentication = ({ hideAuth }: AuthenticationProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verifier, setVerifier] = useState<string | null>(null);

  const setJwt = useAuthStore((state) => state.setJwt);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const userError = useUserStore((state) => state.error);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      const { queryParams } = Linking.parse(event.url);

      if (!queryParams || !(typeof queryParams.oauth_verifier === "string")) {
        return;
      }

      setVerifier(queryParams.oauth_verifier);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (token === null || secret === null || verifier === null) {
        return;
      }

      let jwt: string | null = null;

      // fetch jwt token
      await axios({
        url: "/auth/usos/jwt",
        method: "post",
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        data: { token, secret, verifier },
      })
        .then(async (response) => {
          setJwt(response.data.jwt);
          jwt = response.data.jwt;
        })
        .catch((error: AxiosError) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });

      if (!jwt) {
        // this condition should never be met
        // it was written to make the jwt has string type and if something very bad were to happen
        setError(new AxiosError("jwt token not found"));
        return;
      }

      let ok = false;

      // check if token is ok
      await axios({
        url: "/ping/authorized",
        method: "get",
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        headers: { Authorization: "Bearer " + jwt },
      })
        .then(async (response) => {
          ok = true;
        })
        .catch((error: AxiosError) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });

      if (!ok) {
        setError(new AxiosError("invalid jwt token"));
        return;
      }

      // fetch user data
      await fetchUser();

      if (userError) {
        setError(userError);
        return;
      }

      // if everyting is ok, hide auth
      hideAuth();
    })();
  }, [token, secret, verifier]);

  const loginWithUsos = async () => {
    let redirectUri: string | null = null;

    setLoading(true);

    // fetch oauth url for usos
    await axios({
      url: "/auth/usos/request-token",
      method: "post",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      data: { callbackUrl },
    })
      .then(async (response) => {
        setError(null);
        setToken(response.data.token);
        setSecret(response.data.secret);
        redirectUri = response.data.url;
      })
      .catch((error: AxiosError) => {
        setError(error);
      })
      .finally(() => {});

    if (!redirectUri) {
      return;
    }

    // redirect to oauth url and redirect back
    await WebBrowser.openBrowserAsync(redirectUri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          variant="displayLarge"
          style={{ marginBottom: 100, fontWeight: "bold" }}
        >
          MiNISpace
        </Text>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Button
            mode="contained"
            icon="account-circle"
            onPress={loginWithUsos}
            style={{ marginVertical: 10, width: 220 }}
            disabled={loading}
          >
            Zaloguj się przez USOS
          </Button>
          <Button
            mode="outlined"
            icon="account-off"
            onPress={hideAuth}
            style={{ marginVertical: 10, width: 220 }}
            disabled={loading}
          >
            Zaloguj się jako gość
          </Button>
          <HelperText type="error" visible={error !== null}>
            <Text>Błąd: {error !== null ? error.message : ""}</Text>
          </HelperText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Authentication;
