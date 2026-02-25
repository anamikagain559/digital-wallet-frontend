import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const HeroSection = ({
  heading = "PocketBD – Your Digital Wallet, Simplified",
  description = "Securely send, receive, and manage your money with PocketBD. Fast, reliable, and designed for Bangladesh’s everyday transactions.",
  button = {
    text: "Get Started Now",
    url: "/login",
  },
  reviews = {
    count: 1200,
    rating: 4.8,
    avatars: [
      {
        src: "https://randomuser.me/api/portraits/men/32.jpg",
        alt: "User 1",
      },
      {
        src: "https://randomuser.me/api/portraits/women/44.jpg",
        alt: "User 2",
      },
      {
        src: "https://randomuser.me/api/portraits/men/56.jpg",
        alt: "User 3",
      },
      {
        src: "https://randomuser.me/api/portraits/women/22.jpg",
        alt: "User 4",
      },
      {
        src: "https://randomuser.me/api/portraits/men/78.jpg",
        alt: "User 5",
      },
    ],
  },
}: Hero7Props) => {
  return (
    <section className="py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold lg:text-5xl text-blue-900">
            {heading}
          </h1>

          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>

        <Button asChild size="lg" className="mt-10 bg-blue-600 hover:bg-blue-700 text-white">
          <a href={button.url}>{button.text}</a>
        </Button>

        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>

          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`size-5 ${
                    index < Math.round(reviews.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}

              <span className="mr-1 font-semibold text-gray-900">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>

            <p className="text-muted-foreground text-left font-medium">
              from {reviews.count}+ satisfied users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
