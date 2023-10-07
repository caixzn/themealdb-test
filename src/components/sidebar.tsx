import { Link } from "react-router-dom";

export function Sidebar() {
  const items = ['nome', 'primeira letra', 'igrediente principal'];

  return (
    <>
      <h2 className="mt-2 mb-6 text-xl font-bold"><a href="/">busca de receitas</a></h2>
      <p className="mb-2 text-sm text-zinc-300">buscar por...</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => <SidebarItem key={item.replace(/ /g, '_')} name={item} />)}
      </ul>
    </>
  )
}

function SidebarItem({ name }: { name: string }) {
  return (
    <Link className="relative flex items-center w-full gap-2 py-1 pl-2 transition ease-in-out rounded-sm cursor-pointer hover:bg-zinc-300 hover:text-stone-800" to={name.replace(/ /g, '_')}>
      {name}
    </Link>
  )
}
