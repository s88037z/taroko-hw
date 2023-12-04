import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "node:test";
import Title from "@/app/contacts/_components/Title";
import { SortOrder } from "@/app/contacts/_components/ContactList";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
      prefetch: () => null,
    };
  },
}));

const sortIconsMap = {
  [SortOrder.ASC]: "[data-icon='arrow-down-a-z']",
  [SortOrder.DESC]: "[data-icon='arrow-down-z-a']",
};

const sortFlipMap = {
  [SortOrder.ASC]: [SortOrder.DESC],
  [SortOrder.DESC]: [SortOrder.ASC],
};

describe("Title", () => {
  afterEach(() => {
    mockPush.mockClear();
  });

  [SortOrder.ASC, SortOrder.DESC].forEach((sort) => {
    it(`should render Title text and Icon with corresponding ${sort}`, () => {
      const { container } = render(<Title order={sort} />);
      const title = screen.getByText(/Contacts/);
      const icon = container.querySelector(sortIconsMap[sort]);
      expect(title).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    it(`click icon should cause searchParam flip`, () => {
      const { container } = render(<Title order={sort} />);
      const icon = container.querySelector(sortIconsMap[sort]);
      fireEvent.click(icon as Element);
      expect(mockPush.mock.calls[0][0]).toBe(
        `/contacts?sort=${sortFlipMap[sort]}`
      );
    });
  });
});
