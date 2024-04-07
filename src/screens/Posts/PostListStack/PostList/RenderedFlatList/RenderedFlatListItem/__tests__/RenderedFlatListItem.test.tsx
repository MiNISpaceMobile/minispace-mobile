import { render, screen, within } from "@testing-library/react-native";
import "@testing-library/jest-native/";
import React from "react";

import RenderedFlatListItem from "../RenderedFlatListItem";

it("post contains title component", () => {
  render(
    <RenderedFlatListItem
      route={null}
      navigation={null}
      post={{ id: "", title: "", content: "", imageURI: "" }}
    />,
  );

  expect(screen.getByTestId("title")).toBeOnTheScreen();
});

it("correctly renders title", () => {
  render(
    <RenderedFlatListItem
      route={null}
      navigation={null}
      post={{ id: "", title: "Some test title", content: "", imageURI: "" }}
    />,
  );

  const { getByText } = within(screen.getByTestId("title"));
  expect(getByText("Some test title")).toBeOnTheScreen();
});

it("post contains content component", () => {
  render(
    <RenderedFlatListItem
      route={null}
      navigation={null}
      post={{ id: "", title: "", content: "", imageURI: "" }}
    />,
  );

  expect(screen.getByTestId("content")).toBeOnTheScreen();
});

it("correctly renders content", () => {
  render(
    <RenderedFlatListItem
      route={null}
      navigation={null}
      post={{ id: "", title: "", content: "Some test content", imageURI: "" }}
    />,
  );

  const { getByText } = within(screen.getByTestId("content"));
  expect(getByText("Some test content")).toBeOnTheScreen();
});

it("post contains image component", () => {
  render(
    <RenderedFlatListItem
      route={null}
      navigation={null}
      post={{ id: "", title: "", content: "", imageURI: "" }}
    />,
  );

  expect(screen.getByTestId("image")).toBeOnTheScreen();
});
