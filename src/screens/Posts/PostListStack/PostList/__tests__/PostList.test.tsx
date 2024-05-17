import { render, screen, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import React from "react";

import PostList from "../PostList";

const server = setupServer(
  http.get("*/posts", async () => {
    return HttpResponse.json([
      {
        id: "0",
        title: "Some test title",
        content: "Some test content",
        imageURI: "",
      },
      {
        id: "1",
        title: "Some test title2",
        content: "Some test content2",
        imageURI: "",
      },
    ]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

it("should render loading indicator", async () => {
  server.use(
    http.get("*/posts", async () => {
      await new Promise((r) => setTimeout(r, 100));
      return HttpResponse.json([
        {
          id: "0",
          title: "Some test title",
          content: "Some test content",
          imageURI: "",
        },
        {
          id: "1",
          title: "Some test title2",
          content: "Some test content2",
          imageURI: "",
        },
      ]);
    }),
  );

  waitFor(() => {
    render(<PostList route={null} navigation={null} />);
  });

  const loadingStatus = await screen.findByTestId("loading-status");
  expect(loadingStatus).toBeOnTheScreen();
});

it("should render post after a fetching it", async () => {
  render(<PostList route={null} navigation={null} />);

  await waitFor(() => {
    expect(screen.getByText("Some test title")).toBeOnTheScreen();
  });
});

it("should render multiple posts after a fetching it", async () => {
  render(<PostList route={null} navigation={null} />);

  await waitFor(() => {
    expect(screen.getByText("Some test title")).toBeOnTheScreen();
    expect(screen.getByText("Some test title2")).toBeOnTheScreen();
  });
});

it("should render error message after problem with fetching", async () => {
  server.use(
    http.get("*/posts", async () => {
      return HttpResponse.error();
    }),
  );

  render(<PostList route={null} navigation={null} />);

  const errorStatus = await screen.findByTestId("error-status");
  expect(errorStatus).toBeOnTheScreen();
});

it("should render empty-list component after fetching empty list", async () => {
  server.use(
    http.get("*/posts", async () => {
      return HttpResponse.json([]);
    }),
  );

  render(<PostList route={null} navigation={null} />);

  const emptyListStatus = await screen.findByTestId("emptylist-status");
  expect(emptyListStatus).toBeOnTheScreen();
});
