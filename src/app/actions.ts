"use server";
type ToogleHabitProps = {
  habit: string;
  habitStreak: Record<string, boolean> | null;
  date: string | null;
  done?: boolean;
};
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function deleteHabit(habit: string) {
  await kv.hdel("habits", habit);

  revalidatePath("/");
}

export async function toogleHabit({
  habit,
  habitStreak,
  date,
  done,
}: ToogleHabitProps) {
  if (!habitStreak || !date) {
    return;
  }

  const updatedHabitStreak = {
    [habit]: {
      ...habitStreak,
      [date]: done === undefined ? true : !done,
    },
  };
  await kv.hset("habits", updatedHabitStreak);

  revalidatePath("/");
}
