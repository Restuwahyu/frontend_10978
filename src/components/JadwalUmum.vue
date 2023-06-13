<script>
/* eslint-disable */
export default {
  name: "JDU",
  data() {
    return {
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
      dialogConfirm: false,
      dialogConfirmDelete: false,
      dialogConfirmEdit: false,
      error_message: "",
      color: "",
      search: "",
      jadwal_umum: new FormData(),
      jadwal_umums: [],
      hari: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      form: {
        id_instruktur: [],
        id_kelas: [],
        hari: [],
        jam_mulai: [],
        jam_selesai: [],
      },
      deleteId: "",
      showId: "",
      editId: "",
      instrukturList: [],
      kelasList: [],
    };
  },
  methods: {
    setForm() {
      if (this.inputType === "Ubah") {
        this.Update();
      } else if (this.inputType === "Show") {
        this.showData();
      } else {
        this.Save();
      }
    },

    ReadData() {
      let url = this.$api + "/jadwal_umum";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.jadwal_umums = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ReadDataInstruktur() {
      var url = this.$api + "/instruktur";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.instrukturList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ReadDataKelas() {
      var url = this.$api + "/kelas";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.kelasList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Save() {
      this.jadwal_umum.append("id_instruktur", this.form.id_instruktur);
      this.jadwal_umum.append("id_kelas", this.form.id_kelas);
      this.jadwal_umum.append("hari", this.form.hari);
      this.jadwal_umum.append("jam_mulai", this.form.jam_mulai);
      this.jadwal_umum.append("jam_selesai", this.form.jam_selesai);
      var url = this.$api + "/jadwal_umum";
      this.load = true;
      this.$http
        .post(url, this.jadwal_umum, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.Close();
          this.ReadData();
          this.ResetForm();
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Update() {
      var data = new FormData();
      data.append("id_instruktur", this.form.id_instruktur);
      data.append("id_kelas", this.form.id_kelas);
      data.append("hari", this.form.hari);
      data.append("jam_mulai", this.form.jam_mulai);
      data.append("jam_selesai", this.form.jam_selesai);

      var url = this.$api + "/jadwal_umum/" + this.editId;
      this.load = true;
      this.$http
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.Close();
          this.ReadData();
          this.ResetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    DeleteData() {
      //mengahapus data
      var url = this.$api + "/jadwal_umum/" + this.deleteId;
      //data dihapus berdasarkan id
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.Close();
          this.ReadData(); //mengambil data
          this.ResetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    //Mengambil data dari DB
    EditHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_jadwal_umum;
      this.form.id_instruktur = item.instruktur.nama_instruktur;
      this.form.id_kelas = item.kelas.nama_kelas;
      this.form.hari = item.hari;
      this.form.jam_mulai = item.jam_mulai;
      this.form.jam_selesai = item.jam_selesai;
      this.dialog = true;
    },

    DeleteHandler(id_jadwal_umum) {
      this.deleteId = id_jadwal_umum;
      this.dialogConfirmDelete = true;
    },

    Close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.ReadData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.inputType = "Tambah";
    },

    ResetForm() {
      this.form = {
        id_instruktur: [],
        id_kelas: [],
        hari: [],
        jam_mulai: [],
        jam_selesai: [],
      };
    },

    getHariByIndex(index) {
      const hari = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ];
      return hari[index];
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
    jadwal_umumsGrouped() {
      const grouped = [];
      this.jadwal_umums.forEach((jadwal) => {
        const existingGroup = grouped.find(
          (group) => group.hari === jadwal.hari
        );
        if (existingGroup) {
          existingGroup.jadwal_umums.push(jadwal);
        } else {
          grouped.push({
            hari: jadwal.hari,
            jadwal_umums: [jadwal],
          });
        }
      });
      return grouped;
    },
  },
  mounted() {
    this.ReadData();
    this.ReadDataInstruktur();
    this.ReadDataKelas();
  },
};
</script>

<template>
  <v-main class="JDU">
    <h3 class="text font-weight-medium mb-5">Data Jadwal Umum</h3>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn class="mx-2" fab dark color="blue" @click="dialog = true">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>

      <h3 class="text font-weight-medium mb-5">Kelas Pagi</h3>
      <table class="table-stripped">
        <!-- <thead>
          <tr>
            <th>Hari/Tanggal</th>
          </tr>
        </thead> -->
        <tbody>
          <template v-for="jadwalGroup in jadwal_umumsGrouped">
            <tr :key="jadwalGroup.hari">
              <td class="hari">
                {{ jadwalGroup.hari }}
              </td>
              <td v-for="jadwal in jadwalGroup.jadwal_umums">
                <!-- <template > -->
                <div
                  v-if="
                    jadwal.jam_mulai === '08:00:00' ||
                    jadwal.jam_mulai === '09:30:00'
                  "
                  class="jadwal-group"
                >
                  <br />
                  {{ jadwal.jam_mulai === "08:00:00" ? "8AM" : "9.30AM" }}
                  <br />
                  {{ jadwal.kelas.nama_kelas }}
                  <br />
                  {{ jadwal.instruktur.nama_instruktur }}
                  <br />
                  <v-btn
                    icon
                    small
                    class="mr-2 v-btn--floating"
                    color="primary"
                    @click="EditHandler(jadwal)"
                  >
                    <v-icon color="blue">mdi-account-edit</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    small
                    class="mr-2 v-btn--floating"
                    @click="DeleteHandler(jadwal.id_jadwal_umum)"
                  >
                    <v-icon color="red">mdi-delete-forever</v-icon>
                  </v-btn>
                </div>
                <!-- </template> -->
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <h3 class="text font-weight-medium mb-5">Kelas Sore</h3>
      <table class="table-stripped">
        <!-- <thead>
          <tr>
            <th>Hari/Tanggal</th>
          </tr>
        </thead> -->
        <tbody>
          <template v-for="jadwalGroup in jadwal_umumsGrouped">
            <tr :key="jadwalGroup.hari">
              <td class="hari">
                {{ jadwalGroup.hari }}
              </td>
              <td v-for="jadwal in jadwalGroup.jadwal_umums">
                <!-- <template > -->
                <div
                  v-if="
                    jadwal.jam_mulai === '17:00:00' ||
                    jadwal.jam_mulai === '18:30:00'
                  "
                  class="jadwal-group"
                >
                  <br />
                  {{ jadwal.jam_mulai === "17:00:00" ? "5PM" : "6.30PM" }}
                  <br />
                  {{ jadwal.kelas.nama_kelas }}
                  <br />
                  {{ jadwal.instruktur.nama_instruktur }}
                  <br />
                  <v-btn
                    icon
                    small
                    class="mr-2 v-btn--floating"
                    color="primary"
                    @click="EditHandler(jadwal)"
                  >
                    <v-icon color="blue">mdi-account-edit</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    small
                    class="mr-2 v-btn--floating"
                    @click="DeleteHandler(jadwal.id_jadwal_umum)"
                  >
                    <v-icon color="red">mdi-delete-forever</v-icon>
                  </v-btn>
                </div>
                <!-- </template> -->
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-card>

    <!-- Membuat v-model dialog -->
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Data Jadwal Umum</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-select
              v-model="form.id_instruktur"
              label="Nama Instruktur"
              :items="instrukturList"
              item-text="nama_instruktur"
              item-value="id_instruktur"
            ></v-select>
            <v-select
              v-model="form.id_kelas"
              label="Nama Kelas"
              :items="kelasList"
              item-text="nama_kelas"
              item-value="id_kelas"
            ></v-select>
            <v-select
              v-model="form.hari"
              label="Hari"
              :items="[
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
                'Minggu',
              ]"
            ></v-select>
            <v-text-field
              type="time"
              v-model="form.jam_mulai"
              label="Jam Mulai"
              step="1"
            ></v-text-field>
            <v-text-field
              type="time"
              v-model="form.jam_selesai"
              label="Jam Selesai"
              step="1"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="blue darken-1" text @click="dialogConfirm = true">
            SIMPAN
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi menambahkan data-->
    <v-dialog v-model="dialogConfirm" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menambahkan data jadwal reguler tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi edit data-->
    <v-dialog v-model="dialogConfirmEdit" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menyimpan perubahan data jadwal reguler
          tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi hapus data-->
    <v-dialog v-model="dialogConfirmDelete" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menghapus data jadwal reguler tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="DeleteData"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<style>
.hari {
  background-color: #343a40;
  color: white;
}

.table-stripped {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.table-stripped th,
.table-stripped td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-stripped tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-stripped th {
  background-color: #343a40;
  color: white;
}

.jadwal-group {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
}
</style>
