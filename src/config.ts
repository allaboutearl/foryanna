import { SurpriseConfig } from './types.ts';
import octoberSong from './assets/audio/we_fell_in_love_in_october.mp3';

/**
 * 🎀 GIRLFRIEND DAY CONFIGURATION 🎀
 * 
 * You can easily customize any of these values directly here in code,
 * or use the "Edit ♡" button directly on the website!
 * 
 * Photos are loaded from the /images folder:
 * - images/photo1.jpg
 * - images/photo2.jpg
 * - images/photo3.jpg
 * - images/favorite.jpg
 */
export const DEFAULT_CONFIG: SurpriseConfig = {
  // Names
  herName: "for yanna",
  yourName: "Your Boyfriend",
  musicUrl: octoberSong || '/audio/we_fell_in_love_in_october.mp3',

  // Page 1 — Welcome
  welcomeTitle: "To whom my heart belongs",
  welcomeSubtitle: "",
  startButtonText: "START ♡",

  // Page 2 — Interactive Memory Journey
  sceneText: "Tap along the path to guide Usagi ♡",
  scenePhoto: "images/photo1.jpg",
  sceneButtonText: "See Our Memories →",
  journeyVaultMessage: "I saved some little moments of us here ♡",
  journeyButtonText: "See Our Memories →",

  // Page 3 — Memories (3 Vertically Stacked Cards)
  memoriesTitle: "",
  memories: [
    {
      id: "memory-1",
      image: "",
      message: "",
      date: "",
    },
    {
      id: "memory-2",
      image: "",
      message: "",
      date: "",
    },
    {
      id: "memory-3",
      image: "",
      message: "",
      date: "",
    },
  ],
  memoriesButtonText: "NEXT →",

  // Page 4 — Final Message
  finalTitle: "One Last Thing... ♡",
  favoritePhoto: "images/favorite.jpg",
  loveLetter: `happy girlfriend day, darling!

i honestly don't know where to start since we just started and we haven't been together for that long yet. we're still at the very beginning of everything. so i might not have yet many stories to tell or memories to look back. but even with the little time we've had together. im really grateful for having you. it sometimes feel unreal because you'd almost do everything you can just to make me happy. out of all people i could've met, i somehow ended up meeting you, getting close to you, and being someone i can genuinely love and call mine. im really happy that we ended up choosing each other, and i get to be someone who could stay besides you, having a quality time for each other, and hopefully makes your days a little better.

i know we’re still getting to know each other in so many ways. there are probably still a lot of things about me that you don’t know, and the same goes for you. we’ll still have moments where we misunderstand each other, moments where we don’t know what to say, random conversations that make absolutely no sense, and probably a lot of little things we’ll have to learn about each other along the way. but honestly, i like that we’re still at that stage. there’s something nice about knowing that there’s still so much of you for me to discover.
i want to know the little things too. the random thoughts that suddenly appear in your head, the things that make you happy for no reason, the things you get excited about, the things you’re embarrassed to talk about, your favorite little habits, the stories you’ve never gotten around to telling me, and even the parts of yourself that you think are difficult to understand. you don’t have to show me everything all at once. i’m okay with learning you slowly. and i hope you know that you don’t have to be a certain way around me just to be loved. you don’t have to always be happy, always know what to say, or always have the perfect response. you can be quiet. you can be tired. you can have a bad day. you can take your time when you need to process things. i’m not expecting you to be perfect, because i’m definitely not perfect either. i just want us to be able to be ourselves around each other without feeling like we have to constantly perform or prove something.

i also want to say sorry about what happened last night and about how i handled everything. i know our argument started because of the misunderstanding about the pictures you posted sa tiktok mo and i realize na i could’ve communicated my feelings better instead of letting my emotions take over.

hindi naman ako galit sayo for being yourself or for posting what you want. i know na it’s your choice, and i respect that. i just got worried when i saw the revealing pictures, pero i didn’t know how to properly express that without making it seem like i was judging you or telling you what you can and can’t do. i’m not thinking badly of you at all. i just care about you, and sometimes that makes me overthink and become more protective than i should be. i’m sorry if my reaction made you feel controlled or judged,  that was never my intention. i should’ve just calmly told you that i was worried instead of turning it into an argument. i’m really sorry about it darling. i’ll try to communicate better next time.

at the end of everything, i just want you to know kung gaano ako ka-grateful na dumating ka sa buhay ko. i know na we’re still starting out, and marami pa tayong kailangan matutunan about each other, pero genuinely happy ako sa kung anong meron tayo ngayon. hindi ko naman kailangan na ma-figure out natin agad lahat. i just want us to keep being honest with each other, mag-usap kapag may mga bagay na mahirap, and enjoy the little moments na meron tayo. whatever happens next, gusto ko na mangyari siya naturally, without pressure or expectations. i’ll keep trying to understand you, appreciate you, and be here for you as long as comfortable ka na nandito ako. again, happy girlfriend day, darling. i’m really happy na nakilala kita, and i hope this is only the beginning of many more memories na mabubuo natin together.`,
};
