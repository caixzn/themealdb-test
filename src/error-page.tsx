import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string };
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="flex flex-col items-center justify-center text-5xl font-bold"><span>{`erro ${error.status}`}</span></h1>
      <p className="text-xl text-stone-400">
        <i>{`${error.statusText}` || error.message}</i>
      </p>
    </div>
  );
}
