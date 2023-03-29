import { randomNumberBetween } from "./randomNumberBetween";

const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

describe("Tests for randomNumberBetween function -", () => {
  describe("when Math.random() return 0 it", () => {
    beforeEach(() => {
      randomSpy.mockClear().mockReturnValue(0);
    });

    it("should return 3 called with 3 and 5", () => {
      expect(randomNumberBetween(3, 5)).toBe(3);
    });

    it("should return 5 called with 5 and 8", () => {
      expect(randomNumberBetween(5, 8)).toBe(5);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });

  describe("when Math.random() return 0.5 it", () => {
    beforeEach(() => {
      randomSpy.mockClear().mockReturnValue(0.5);
    });
    it("should return 4 when called with 3 and 5", () => {
      expect(randomNumberBetween(3, 5)).toBe(4);
    });
  });

  describe("when Math.random() return 0.9999 it", () => {
    beforeEach(() => {
      randomSpy.mockClear().mockReturnValue(0.999);
    });

    it("should return 5 when called with 3 and 5", () => {
      expect(randomNumberBetween(3, 5)).toBe(5);
    });
  });
});
