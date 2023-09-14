type User = {
  name: string;
  roles: string;
  profilePicture?: string;
};

type SidebarProps = {
  user: User;
};

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="flex flex-col w-[200px] bg-white h-screen border-r-2 border-purple">
      <div className="mt-5 mx-4 flex gap-2 items-center border-b border-b-gray pb-5">
        <button className="bg-red h-[45px] w-[45px] text-white font-bold text-lg rounded-full">
          JS
        </button>
        <div className="user-details">
          <div className="font-bold">{user.name}</div>
          <div className="text-gray text-sm font-medium">{user.roles}</div>
        </div>
      </div>
      <div className="m-5">
        <ul className="">
          <li className="mb-4">
            <div className="flex gap-1 font-bold items-center">
              <div className="">
                <i className="icon-home-outline font-bold text-xl"></i>
              </div>
              <div className="">Home</div>
            </div>
          </li>
          <li className="mb-4">
            <div className="flex gap-1 font-bold items-center">
              <div className="">
                <i className="icon-orders font-bold text-xl"></i>
              </div>
              <div className="">Transaksi</div>
            </div>
          </li>
          <li className="mb-3">
            <div className="flex gap-1 font-bold items-center">
              <div className="">
                <i className="icon-product font-bold text-xl"></i>
              </div>
              <div className="">Master Data</div>
            </div>
            <ul className="pl-5">
              <li>Produk</li>
              <li>Kategori Produk</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
