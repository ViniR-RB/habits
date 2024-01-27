import { kv } from "@vercel/kv";
import Link from "next/link";
import DayState from "./components/DayState";
import DeletedButton from "./components/DeletedButton";
export type Habits = {
  [habit: string]: Record<string,boolean>;
} | null
export default async function Home() {
  
  const habits = await kv.hgetall("habits")
  const today = new Date()
  const todayWeekDay = today.getDay()
  const daysWeek = ['Dom', "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

  const sortedWeekDay = daysWeek.slice(todayWeekDay + 1).concat(daysWeek.slice(0, todayWeekDay + 1))


  const lastSevenDays = daysWeek.map((_,index) => {
    const dateNow = new Date()
    dateNow.setDate(dateNow.getDate() - index)

    return dateNow.toISOString().slice(0,10)
  }).reverse()

  
  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {habits === null || Object.keys(habits).length === 0 && (
        <h1 className="mt-20 text-4xl font-light text-white font-display text-center">Você não tem hábitos cadastrados</h1>
      )}
      {
        habits !== null && Object.entries(habits).map(
          ([habit, habitStreak]) => (
            <div key={habit} className="flex flex-col gap-2" >
              <div className="flex justify-between items-center">

                <span className="text-xl font-light text-white font-sans">{habit}</span>
                <DeletedButton habit={habit} />
              </div>
              <Link href={`habit/${habit}`} >
              <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
                {sortedWeekDay.map((day,index) => (
                  <div key={day} className="flex flex-col last:font-bold">
                    <span className="font-sans text-xs text-white text-center" >{day}</span>
                    {/* {day state} */}
                    <DayState day={habitStreak[lastSevenDays[index]]} />
                  </div>
                ))}
              </section>
              </Link>
            </div>
          )
        )
      }
      <Link href={"new-habit"} className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45EDAD] font-display font-regular text-2xl p-2 rounded-md">Novo Habito</Link>
    </main>
  )
}
