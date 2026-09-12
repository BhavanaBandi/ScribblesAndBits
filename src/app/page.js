import HomeExperience from "@/components/HomeExperience";
import { getLatestNewsletter } from "@/lib/newsletters";

export default function Home() {
  const latestNewsletter = getLatestNewsletter();

  return <HomeExperience latestNewsletter={latestNewsletter} />;
}
