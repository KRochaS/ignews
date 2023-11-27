import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("SubscribeButton Component", () => {
  it("renders correctly", () => {
    const useSessioMocked = jest.mocked(useSession);
    useSessioMocked.mockReturnValueOnce({
      data: null,
      status: "authenticated",
    });

    render(<SubscribeButton />);
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirect to signin when not authenticated", () => {
    const useSessioMocked = jest.mocked(useSession);
    useSessioMocked.mockReturnValueOnce({
      data: { user: null },
      status: "authenticated",
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);

    const signInMocked = jest.mocked(signIn);
    signInMocked.mockReturnValueOnce({} as any);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirect to post when user is authenticated and had an active subscription", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        activeSubscription: "active",
        expires: "fake-expires",
      },
    } as any);

    const router = useRouter();

    render(<SubscribeButton />);

    const subscribeButtonActive = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButtonActive);

    expect(router.push).toHaveBeenCalledWith("/posts");
  });
});
