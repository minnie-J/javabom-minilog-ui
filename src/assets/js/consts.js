const PAGE_LIST = [
  {
    id: "ARTICLES",
    path: "/",
    name: "Main"
  }
];

// export const PAGES = F.reduce(
//   (acc, page) => {
//     acc.ids.push(page.id);
//     acc.byId[page.id] = page;
//     return acc;
//   },
//   { ids: [], byId: {}},
//   PAGE_LIST
// )

export const PAGES = PAGE_LIST.reduce(
  (acc, page) => {
    acc.ids.push(page.id);
    acc.byId[page.id] = page;
    return acc;
  },
  { ids: [], byId: {} }
);
