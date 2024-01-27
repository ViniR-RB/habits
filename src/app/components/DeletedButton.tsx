"use client"
import Image from "next/image"
import { deleteHabit } from "../actions"

function DeletedButton({ habit }: { habit: string }) {
    return (<button onClick={() => deleteHabit(habit)}>
        <Image src="/images/trash.svg" alt="Ícone de lixeira" width={20} height={20} />
    </button>)
}


export default DeletedButton