import CloudServicePage from "@/app/(public)/cloud/[username]/page-client";
import { getUserByNameAction } from "@/modules/users/user.actions";
import { UserDto } from "@/modules/users/user.types";

export default async function CloudPage(props: PageProps<'/cloud/[username]'>) {
  const { params } = props;
  const { username } = await params;


  // Fetch user by username
  const user: UserDto | null = await getUserByNameAction(username);
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 text-xl">
        User not found 🚫
      </div>
    );
  }

  // Pass only the user; files are fetched inside the client component
  return <CloudServicePage user={user} />;
}
