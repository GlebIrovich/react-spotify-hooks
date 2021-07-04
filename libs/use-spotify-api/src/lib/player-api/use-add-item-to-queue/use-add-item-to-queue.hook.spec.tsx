import {
  AddItemToQueueParams,
  useAddItemToQueue,
} from "./use-add-item-to-queue.hook";
import TestComponent from "../../../test-utils/test-component";
import {
  mockSuccessfulApiPostRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";
import { render } from "@testing-library/react";

const configs: AddItemToQueueParams = {
  uri: "URI",
};

const Component = ({ configs }: { configs: AddItemToQueueParams }) => {
  const [request, data] = useAddItemToQueue<any>();

  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useSpotifySearch", () => {
  it("should do nothing if token is not provided", () => {
    mockUseSpotifyState({ tokenData: undefined } as any);
    const { container } = render(<Component configs={configs} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it("should return results if request was successful", async () => {
    const token = "MY_TOKEN";
    mockUseSpotifyState({ tokenData: { token } } as any);

    const fetchMock = mockSuccessfulApiPostRequest({
      content: { data: "DATA" },
      error: null,
    });
    const { container, findByTestId } = render(
      <Component configs={{ ...configs, device: "123" }} />
    );

    const expectedUrl =
      "https://api.spotify.com/v1/me/player/queue?uri=URI&device=123";
    expect(fetchMock).toBeCalledWith(expectedUrl, token);
    await findByTestId("content");

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="content"
  >
    {"data":"DATA"}
  </div>
</div>
`);
  });
});
