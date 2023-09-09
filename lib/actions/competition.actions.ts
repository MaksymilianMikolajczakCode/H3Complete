"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Competition from "../models/competition.model";
import Match from "../models/match.model";

export async function fetchCompetitions(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const competitionsQuery = Competition.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "owner",
      model: User,
    })
    // .populate({
    //   path: "children", // Populate the children field
    //   populate: {
    //     path: "author", // Populate the author field within children
    //     model: User,
    //     select: "_id name parentId image", // Select only _id and username fields of the author
    //   },
    // });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalCompetitionsCount = await Competition.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const competitions = await competitionsQuery.exec();

  const isNext = totalCompetitionsCount > skipAmount + competitions.length;

  return { competitions, isNext };
}

interface Params {
  title: string,
  owner: string,
  regulationsLink: string,
  regulations: String,
  details: String,
  startDate: Date,
  type: String,
  path: string,
}

export async function createCompetition({ title, owner, regulationsLink, regulations, details, startDate, type, path}: Params
) {
  try {
    connectToDB();
    const createdCompetition = await Competition.create({
      title,
      owner,
      regulationsLink,
      regulations,
      details,
      startDate,
      type
    });

    // Update User model
    await User.findByIdAndUpdate(owner, {
      $push: { owner: createdCompetition._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create competition: ${error.message}`);
  }
}



export async function JoinCompetition({userId, competitionId} : { userId : string, competitionId: string}) {
  connectToDB();
  
  try {
    await Competition.findByIdAndUpdate(competitionId, { 
      $push: { players: userId}
    })

    await User.findByIdAndUpdate(userId, {
        $push: { competitions: competitionId },
      });
  } catch (err) {
    console.error("Error while joining competition:", err);
    throw new Error("Unable to join competition");
  }
}





// async function fetchAllChildThreads(threadId: string): Promise<any[]> {
//   const childThreads = await Thread.find({ parentId: threadId });

//   const descendantThreads = [];
//   for (const childThread of childThreads) {
//     const descendants = await fetchAllChildThreads(childThread._id);
//     descendantThreads.push(childThread, ...descendants);
//   }

//   return descendantThreads;
// }

// export async function deleteThread(id: string, path: string): Promise<void> {
//   try {
//     connectToDB();

//     // Find the thread to be deleted (the main thread)
//     const mainThread = await Thread.findById(id).populate("author community");

//     if (!mainThread) {
//       throw new Error("Thread not found");
//     }

//     // Fetch all child threads and their descendants recursively
//     const descendantThreads = await fetchAllChildThreads(id);

//     // Get all descendant thread IDs including the main thread ID and child thread IDs
//     const descendantThreadIds = [
//       id,
//       ...descendantThreads.map((thread) => thread._id),
//     ];

//     // Extract the authorIds and communityIds to update User and Community models respectively
//     const uniqueAuthorIds = new Set(
//       [
//         ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
//         mainThread.author?._id?.toString(),
//       ].filter((id) => id !== undefined)
//     );

//     const uniqueCommunityIds = new Set(
//       [
//         ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
//         mainThread.community?._id?.toString(),
//       ].filter((id) => id !== undefined)
//     );

//     // Recursively delete child threads and their descendants
//     await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

//     // Update User model
//     await User.updateMany(
//       { _id: { $in: Array.from(uniqueAuthorIds) } },
//       { $pull: { threads: { $in: descendantThreadIds } } }
//     );

//     // Update Community model
//     await Community.updateMany(
//       { _id: { $in: Array.from(uniqueCommunityIds) } },
//       { $pull: { threads: { $in: descendantThreadIds } } }
//     );

//     revalidatePath(path);
//   } catch (error: any) {
//     throw new Error(`Failed to delete thread: ${error.message}`);
//   }
// }

export async function fetchCompetitionById(competitionId: string) {
  connectToDB();

  try {
    const competitionQuery = Competition.findById(competitionId)
      .populate({
        path: "owner",
        model: User,
        select: "image username discord id _id"
      }) // Populate the author field with _id and username
      .populate({
        path: "players",
        model: User,
        select: "image username"
      })
    const competition = await competitionQuery.exec()
    return competition;
  } catch (err) {
    console.error("Error while fetching competition:", err);
    throw new Error("Unable to fetch competition");
  }
}

// export async function addCommentToThread(
//   threadId: string,
//   commentText: string,
//   userId: string,
//   path: string
// ) {
//   connectToDB();

//   try {
//     // Find the original thread by its ID
//     const originalThread = await Thread.findById(threadId);

//     if (!originalThread) {
//       throw new Error("Thread not found");
//     }

//     // Create the new comment thread
//     const commentThread = new Thread({
//       text: commentText,
//       author: userId,
//       parentId: threadId, // Set the parentId to the original thread's ID
//     });

//     // Save the comment thread to the database
//     const savedCommentThread = await commentThread.save();

//     // Add the comment thread's ID to the original thread's children array
//     originalThread.children.push(savedCommentThread._id);

//     // Save the updated original thread to the database
//     await originalThread.save();

//     revalidatePath(path);
//   } catch (err) {
//     console.error("Error while adding comment:", err);
//     throw new Error("Unable to add comment");
//   }
// }




export async function generateBracket(competitionId: string) {
  connectToDB();

  try {
    const competitionQuery = Competition.findById(competitionId)
      .populate({
        path: "players",
        model: User,
        select: "image username"
      })
      const competition = await competitionQuery.exec()
      const shuffledPlayers = competition.players.shuffle()
      const  knownBrackets = [2,4,8,16,32,64,128,256,512,1024]
      const base = knownBrackets.find(function( base: number) { return base >= competition.players.length})
      const empty = base - competition.players.value
      if(empty>0)
      // for (let i = 0; i < competition.players.length; i += 2) {
      //   const teamA = shuffledPlayers[i];
      //   const teamB = shuffledPlayers[i + 1];
      //   const match = await Match.create({
      //     players: [teamA, teamB]
      //   })
      //   await Competition.findByIdAndUpdate(competitionId, {
      //     $push: { bracket: match },
      //   });
      // }
      var brackets 	= [],
        round 		= 1,
        baseT 		= base/2,
        baseC 		= base/2,
        teamMark	= 0,
        nextInc		= base/2;

      for(let i=1;i<=(base-1);i++) {
        var	baseR = i/baseT,
          isBye = false;

        if(byes>0 && (i%2!=0 || byes>=(baseT-i))) {
          isBye = true;
          byes--;
        }
  } catch (err) {
    console.error("Error while fetching competition:", err);
    throw new Error("Unable to fetch competition");
  }
}



// chatGPT suggestion 
// class Match {
//   constructor(teamA, teamB) {
//     this.teamA = teamA;
//     this.teamB = teamB;
//     this.winner = null;
//   }
  
//   setWinner(winner) {
//     this.winner = winner;
//   }
// }

// class Bracket {
//   constructor(teams) {
//     this.matches = [];
//     this.initializeBracket(teams);
//   }
  
//   initializeBracket(teams) {
//     for (let i = 0; i < teams.length; i += 2) {
//       const teamA = teams[i];
//       const teamB = teams[i + 1];
//       const match = new Match(teamA, teamB);
//       this.matches.push(match);
//     }
//   }
  
//   getWinners() {
//     return this.matches.map(match => match.winner);
//   }
// }

// function generateBracket(teams) {
//   const bracket = new Bracket(teams);
//   const winners = bracket.getWinners();
  
//   while (winners.length > 1) {
//     const nextBracket = new Bracket(winners);
//     winners = nextBracket.getWinners();
//   }
  
//   return winners[0];
// }

// const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8'];
// const winner = generateBracket(teams);

// console.log('Tournament Winner:', winner);
