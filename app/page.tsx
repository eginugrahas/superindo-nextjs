import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Image
            src="/logo-superindo.png"
            width={100}
            height={100}
            alt="logo"
          ></Image>
          <div className="flex flex-col p-3 mt-3">
            <div className="font-bold text-[24px]">Masuk</div>
            <form action="">
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  className="py-3 px-4 font-medium border rounded border-gray-400 text-sm outline-none"
                  placeholder="Username"
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="password"
                  className="py-3 px-4 font-medium border rounded border-gray-400 text-sm outline-none"
                  placeholder="Password"
                />
              </div>
            </form>
            <div className="mt-4">
              <button
                type="button"
                className="w-full py-3 rounded bg-red items-center font-bold text-p-white hover:opacity-60"
              >
                Masuk
              </button>
            </div>
            <div className="mt-2">
              <div className="text-center text-xs font-medium">
                Baru di Super Indo? <span className="text-red">Daftar disini!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image src="/grocery.png" fill alt="grocery" objectFit="cover"></Image>
      </div>
    </div>
  );
}
