function createFile(name) {
  return { name, type: "file" };
}

function createDirectory(name, children) {
  return { children, name, type: "directory" };
}

const dir = createDirectory("Dir1", [
  createFile("File1"),
  createFile("File2"),
  createDirectory("EmptyDir"),
  createFile("File3"),
  createDirectory("Dir2", [
    createFile("File4"),
    createDirectory("Dir3", [createFile("File5")]),
    createFile("File6"),
  ]),
  createDirectory("Dir3", [createFile("File7"), createFile("File8")]),
  createFile("File9"),
]);

const fileSystemItemsDeleted = [];

function rimraf(fileSystemItem) {
  const { children, type } = fileSystemItem;

  if (type === "directory" && Array.isArray(children))
    children.forEach((child) => rimraf(child));
  fileSystemItemsDeleted.push(fileSystemItem);
}

rimraf(dir);

console.log(fileSystemItemsDeleted.map(({ name }) => name));
