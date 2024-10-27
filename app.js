const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// contoh script pembuatan folder

// make-folder
app.makeFolder = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    fs.mkdir(__dirname + `/${folderName}`, () => {
      console.log("success created new folder");
    });
    rl.close();
  });
};

// To Do : lanjutkan pembuatan logic disini

// make-file
app.makeFile = () => {
  rl.question("Masukkan nama folder :", (folderName) => {
    rl.question("Masukkan nama file :", (fileName) => {
      rl.question("Masukkan nama extension :", (extension) => {
        fs.writeFileSync(`./${folderName}/${fileName}.${extension}`, "");
        console.log(
          `file berhasil dibuat: ${folderName}/${fileName}.${extension}`
        );
        rl.close();
      });
    });
  });
};

// ext-sorter
app.extSorter = () => {
  const files = fs.readdirSync("./unorganize_folder");
  const rename = (folderName, element) => {
    fs.mkdir(__dirname + `/${folderName}`, () => {
      fs.rename(
        __dirname + `/unorganize_folder/${element}`,
        __dirname + `/${folderName}/${element}`,
        (error) => {}
      );
    });
  };

  for (let i = 0; i < files.length; i++) {
    const element = files[i];
    const extension = element.split(".")[element.split(".").length - 1];

    if (["txt", "pdf", "md"].includes(extension)) {
      rename("text", element);
    } else if (["jpg", "png", "jpeg"].includes(extension)) {
      rename("image", element);
    }
  }

  rl.close();
  return;
};

// read-folder

const getJenisFile = (extension) => {
  if (["txt", "pdf", "md"].includes(extension)) {
    return "text";
  } else if (["jpg", "png", "jpeg"].includes(extension)) {
    return "image";
  }
};

app.readFolder = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    // list berupa file
    const files = fs.readdirSync(`./${folderName}`);
    const output = [];
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      try {
        const stat = fs.statSync(__dirname + `/${folderName}/${element}`);
        output.push({
          namaFile: element,
          extensi: element.split(".")[element.split(".").length - 1],
          jenisFile: getJenisFile(
            element.split(".")[element.split(".").length - 1]
          ),
          tanggalDibuat: stat.birthtime,
          ukuranFile: stat.size.toString() + "kb",
        });
      } catch (error) {
        console.log("gagal membaca file", folderName, element);
      }
    }

    console.log(output);
    rl.close();
  });
};

// read-file
app.readFile = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    rl.question("Masukan Nama File : ", (fileName) => {
      const file = fs.readFileSync(`./${folderName}/${fileName}`, "utf-8");
      console.log(file);
      rl.close();
    });
  });
};

module.exports = app;
