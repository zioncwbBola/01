import Link from "next/link";

export default function HeroesHomePage() {

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <Link href="/auth/signin" className="btn btn-primary ">Entrar no Painel Admin</Link>
          <Link href="/auth/signup" className="btn btn-primary">Solicitar acesso ao Painel Admin</Link>
        </div>
      </div>
    </div>
  )

}