import React from "react";
import { UserProfileProps } from "./UserProfile.types";
import Image from "next/image";
import { ExternalLink, TreePalm } from "lucide-react";
import { MoreInfoProfile } from "./MoreInfoProfile";
import Link from "next/link";

export function UserProfile(props: UserProfileProps) {
  const { user } = props;

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden">
      {user?.backgroundImage ? (
        <>
          <Image
            src={user.backgroundImage}
            alt="Background"
            fill
            className="absolute inset-0 object-cover z-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#E4E9ED] z-0" />
      )}

      <div className="relative z-10 flex flex-col items-center gap-4 pt-20 px-4 w-full max-w-xl text-white">
        <MoreInfoProfile user={user} />

        <Image
          src={user.avatarUrl || "/default-avatar.jpeg"}
          alt="User profile"
          width={96}
          height={96}
          className="rounded-full object-cover border-4 border-white shadow-md"
        />

        <p className="font-semibold text-2xl text-center">@{user.username}</p>

        {user?.bio && (
          <p className="text-center text-lg text-gray-200 max-w-md">{user.bio}</p>
        )}

        <div className="flex flex-col gap-4 mt-8 w-full">
          {user.links.map((link) => (
            <Link
              href={link.link || "#"}
              target="_blank"
              key={link.id}
              className="flex items-center justify-between px-6 py-3 rounded-full bg-white text-black hover:bg-violet-100 hover:text-violet-800 transition-all w-full shadow-md"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={link.icon || ""}
                  alt="Icon"
                  width={24}
                  height={24}
                  className="filter grayscale hover:scale-110 transition-transform"
                />
                <span className="text-base font-medium">{link.name}</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>

      <div className="relative z-10 pb-6 mt-4">
        <div className="flex gap-2 items-center justify-center py-2 px-5 bg-white rounded-full shadow-md text-black">
          <TreePalm className="h-5 w-5" />
          <span>JuanesCode links</span>
        </div>
      </div>
    </div>
  );
}
