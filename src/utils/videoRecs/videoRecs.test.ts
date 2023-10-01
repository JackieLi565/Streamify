import { videoRecs } from "./videoRecs";

describe("generateHash", () => {
  test("generates video genres based off a list of video titles", async () => {
    const videoList: string[] = [
      "10 Tips for a Productive Workday",
      "Exploring Hidden Waterfalls in the Jungle",
      "DIY Home Organization Hacks",
      "Top 5 Sci-Fi Movies of All Time",
      "Beginner's Guide to Yoga and Meditation",
      "Baking the Perfect Chocolate Chip Cookies",
    ];

    await videoRecs(videoList);
  }, 60000);
});
