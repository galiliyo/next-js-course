import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

function NewMeetup() {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    router.replace("/");
  };
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetup;
