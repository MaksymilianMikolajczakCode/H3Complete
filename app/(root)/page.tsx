import { UserButton } from "@clerk/nextjs";
 
export default function Home() {
  return (
      <div className="font-sans">

<div className="container mx-auto p-6 text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to H3Complete!</h1>
    <p className="text-lg mb-8">Are you passionate about Heroes of Might and Magic 3? Look no further! H3Complete is your ultimate destination for all things related to Heroes of Might and Magic 3 (Heroes 3).</p>

    <div className="text-left">
        <h2 className="text-2xl font-bold mb-2">What is H3Complete?</h2>
        <p className="text-lg mb-6">H3Complete is a dedicated platform designed for Heroes of Might and Magic 3 enthusiasts, offering a seamless experience for creating, exploring, and sharing templates, as well as organizing and participating in thrilling tournaments.</p>

        <h2 className="text-2xl font-bold mb-2">Features:</h2>
        <ul className="list-disc pl-4 mb-6">
            <li className="text-lg mb-2"><strong>Explore Templates:</strong> Discover an extensive collection of meticulously crafted templates. Whether you seek classNameic scenarios or innovative maps, find the perfect template for your adventure.</li>
            <li className="text-lg mb-2"><strong>Create Templates:</strong> Unleash your creativity! Craft your unique Heroes 3 templates and share them with the community. Let your imagination run wild and design scenarios that challenge and inspire.</li>
            <li className="text-lg mb-2"><strong>Tournaments:</strong> Dive into the world of competitive gameplay. Organize tournaments or join existing ones. Compete with fellow Heroes 3 aficionados and showcase your strategic prowess.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Join the Community:</h2>
        <p className="text-lg mb-6">Become part of an engaging community of Heroes 3 enthusiasts. Share experiences, strategies, and tips. Connect with like-minded players and foster friendships that revolve around the magical world of Heroes of Might and Magic 3.</p>

        <h2 className="text-2xl font-bold mb-2">Get Started:</h2>
        <p className="text-lg mb-4">Whether you're a seasoned veteran or new to the realm of Heroes 3, H3Complete welcomes everyone. Join us on this epic journey filled with adventure, strategy, and camaraderie.</p>
        <p className="text-lg">Begin your quest now and experience Heroes of Might and Magic 3 like never before with H3Complete!</p>
    </div>
</div>

</div>
  )
}