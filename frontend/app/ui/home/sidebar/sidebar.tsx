import React from "react";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.scss";

interface menuItemsInterface {
  title: string;
  list: {
    title: string;
    path: string;
  }[];
}

const menuItems: menuItemsInterface[] = [
  {
    title: "Pages",
    list: [
      {
        title: "Home",
        path: "/home",
      },
      {
        title: "Users",
        path: "/home/users",
      },
      {
        title: "Assets",
        path: "/home/assets",
      },
    ],
  },
];

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {/* <Image
          className={styles.userImage}
          src={user.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div> */}
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          // await signOut();
        }}
      ></form>
    </div>
  );
};

export default Sidebar;
