import { Link, Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <aside className="flex-shrink-0 p-4 md:w-56 bg-zinc-950">
      <Sidebar />
      </aside>
      <main className="flex-grow m-5">
        <Outlet />
      </main>
    </div>
  )
}

function Sidebar() {
  const items = ['nome', 'primeira letra', 'igrediente principal'];

  return (
    <>
      <h2 className="mt-2 mb-6 text-xl font-bold"><a href="/">busca de receitas</a></h2>
      <p className="mb-2 text-sm text-zinc-300">buscar por...</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => <SidebarItem key={item.replace(' ', '_')} name={item} />)}
      </ul>
    </>
  )
}

function SidebarItem({ name }: { name: string }) {
  return (
    <Link className="relative flex items-center w-full gap-2 py-1 pl-2 transition ease-in-out rounded-sm cursor-pointer hover:bg-zinc-300 hover:text-stone-800" to={name.replace(' ', '_')}>
        {name}
      </Link>
  )
}

export function Home() {
  return (
    <>
      <h1 className="mb-4 text-4xl">receita do dia!</h1>
      <Card></Card>
    </>
  )
}

export function SearchByIngredient() {
  return (
    <>
      <h1 className="mb-4 text-4xl">ingredientes</h1>
      <Card></Card>
    </>
  )
}

export function SearchByName() {
  return (
    <>
      <h1 className="mb-4 text-4xl">nome</h1>
      <Card></Card>
    </>
  )
}

export function SearchByFirstLetter() {
  return (
    <>
      <h1 className="mb-4 text-4xl">primeira letra</h1>
      <Card></Card>
    </>
  )
}

export function Card() {
  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg bg-zinc-950">
      <img className="w-full" src="https://placekitten.com/300/300" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
        <p className="text-base text-stone-200">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="max-w-xs px-6 py-4 truncate">
        <a href="" className="text-zinc-400">
          testsafawfawsfawfasfawfasfawfawsfawfasfawfawsfawfasfawfawfawsfawfafasf
        </a>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold rounded-full text-stone-200 bg-zinc-900">#photography</span>
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold rounded-full text-stone-200 bg-zinc-900">#travel</span>
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold rounded-full text-stone-200 bg-zinc-900">#winter</span>
      </div>
    </div>
  )
}
