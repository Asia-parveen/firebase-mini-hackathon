import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  db,
  serverTimestamp,
} from "./firebase.js";

const notify = document.querySelector(".notify");
const addBtn = document.querySelector("#add_Data");
const updateDataBtn = document.querySelector("#update_data");

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "psdemrod");
  formData.append("cloud_name", "dalqrb1h1");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dalqrb1h1/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
}

async function addData() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const imageFile = document.querySelector("#image").files[0];

  if (!title || !body) {
    notify.innerHTML = "Please fill in all fields!";
    setTimeout(() => {
      notify.innerHTML = "";
    }, 3000);
    return;
  }

  try {
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    await addDoc(collection(db, "users"), {
      title,
      body,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    notify.innerHTML = "Data Added Successfully!";
    document.querySelector("#title").value = "";
    document.querySelector("#body").value = "";
    document.querySelector("#image").value = "";

    setTimeout(() => {
      notify.innerHTML = "";
    }, 3000);

    GetData(); // Fetch and display updated data
  } catch (error) {
    console.error("Error adding document: ", error);
    notify.innerHTML = "Error adding data!";
    setTimeout(() => {
      notify.innerHTML = "";
    }, 3000);
  }
}

addBtn.addEventListener("click", addData);

async function GetData() {
  try {
    const getDataQuery = await getDocs(collection(db, "users"));

    let html = `
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Body</th>
        <th>Image</th>
        <th>Timestamp</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>
    `;

    getDataQuery.forEach((doc) => {
      const data = doc.data();
      const timestamp =
        data.createdAt?.toDate().toLocaleString() || "No Timestamp"; // Format timestamp
      html += `
        <tr>
          <td><textarea readonly>${doc.id}</textarea></td>
          <td><textarea readonly>${data.title}</textarea></td>
          <td><textarea readonly>${data.body}</textarea></td>
          <td>
            ${
              data.imageUrl
                ? `<img src="${data.imageUrl}" alt="Uploaded Image" style="width: 100px; height: auto;" />`
                : "No Image"
            }
          </td>
          <td>${timestamp}</td>
          <td>
            <button class="del_btn" onclick="deleteData('${
              doc.id
            }')">Delete</button>
          </td>
          <td>
            <button class="up_btn" onclick="updateData('${
              doc.id
            }')">Update</button>
          </td>
        </tr>`;
    });

    document.querySelector("table").innerHTML = html;
  } catch (err) {
    console.error("Error getting documents: ", err);
  }
}

GetData();

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "users", id));
    notify.innerHTML = "Data Deleted Successfully!";
    setTimeout(() => {
      notify.innerHTML = "";
    }, 3000);
    GetData(); // Refresh data after deletion
  } catch (err) {
    console.error("Error deleting document: ", err);
    notify.innerHTML = "Error deleting data!";
    setTimeout(() => {
      notify.innerHTML = "";
    }, 3000);
  }
};

window.updateData = async function (id) {
  try {
    const docSnapShot = await getDoc(doc(db, "users", id));
    const currentUser = docSnapShot.data();
    document.querySelector("#title").value = currentUser.title;
    document.querySelector("#body").value = currentUser.body;

    updateDataBtn.classList.add("show");
    addBtn.classList.add("hide");

    const newUpdateHandler = async function () {
      const newTitle = document.querySelector("#title").value;
      const newBody = document.querySelector("#body").value;

      if (newTitle && newBody) {
        await updateDoc(doc(db, "users", id), {
          title: newTitle,
          body: newBody,
        });

        notify.innerHTML = "Data Updated Successfully!";
        GetData(); // Refresh data after update
        updateDataBtn.classList.remove("show");
        addBtn.classList.remove("hide");

        document.querySelector("#title").value = "";
        document.querySelector("#body").value = "";

        setTimeout(() => {
          notify.innerHTML = "";
        }, 3000);

        updateDataBtn.removeEventListener("click", newUpdateHandler); // Remove event listener
      } else {
        notify.innerHTML = "Please fill in all fields!";
        setTimeout(() => {
          notify.innerHTML = "";
        }, 3000);
      }
    };

    updateDataBtn.addEventListener("click", newUpdateHandler);
  } catch (err) {
    console.error("Error updating document: ", err);
    notify.innerHTML = "Error updating data!";
    setTimeout(() => {
      notify.innerHTML = "";
    }, 3000);
  }
};
