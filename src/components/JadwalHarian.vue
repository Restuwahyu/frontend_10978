<script>
/* eslint-disable */
import moment from "moment";
export default {
  name: "JDH",
  data() {
    return {
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
      dialogConfirm: false,
      error_message: "",
      color: "",
      search: "",
      jadwal_harian: new FormData(),
      jadwal_harians: [],
      showId: "",
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
      let url = this.$api + "/jadwal_harian";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.jadwal_harians = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
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
      var url = this.$api + "/jadwal_harian";
      this.load = true;
      this.$http
        .post(url, this.jadwal_harian, {
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

    EditLibur(jadwal) {
      if (jadwal.status == "Ada Kelas") {
        jadwal.status = "Libur";
      } else {
        jadwal.status = "Ada Kelas";
      }
    },

    Close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.ReadData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },

    ResetForm() {
      this.form = {
        id_instruktur: [],
        id_kelas: [],
        status: [],
        tanggal_jadwal_harian: [],
      };
    },
  },

  computed: {
    formTitle() {
      return this.inputType;
    },
    //Mengelompokkan jadwal_harians ke dalam grup berdasarkan properti "hari"
    jadwal_hariansGrouped() {
      //Inisialisasi array penampung
      const grouped = [];
      this.jadwal_harians.forEach((jadwal) => {
        //Mencari grup yang sudah ada dengan properti "hari"
        const existingGroup = grouped.find(
          (group) => group.hari === jadwal.hari
        );
        if (existingGroup) {
          //Cek jika ada grup yang sesuai, maka dicari lagi
          existingGroup.jadwal_harians.push(jadwal);
        } else {
          //Cek jika tidak ada grup yang sesuai, buat objek baru dengan properti "hari", "tanggal_jadwal_harian" dan dimasukkan pada array grouped
          grouped.push({
            hari: jadwal.hari,
            tanggal_jadwal_harian: jadwal.tanggal_jadwal_harian,
            jadwal_harians: [jadwal],
          });
        }
      });
      return grouped; //Mengembalikan ulang grup ke array grouped
    },
    //Mengurutkan grup yang sudah ada dari jadwal_hariansGrouped() berdasarkan tanggal_jadwal_harian
    sortedJadwalGroups() {
      //Grup yang sudah ada dicopy dengan slice()
      const sortedGroups = this.jadwal_hariansGrouped.slice();
      //Mengurutkan grup-grup jadwal_harians berdasarkan tanggal.
      sortedGroups.sort((a, b) => {
        const dateA = new Date(a.tanggal_jadwal_harian);
        const dateB = new Date(b.tanggal_jadwal_harian);
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
      return sortedGroups;
    },
  },

  mounted() {
    this.ReadData();
  },
};
</script>

<template>
  <v-main class="JDH">
    <h3 class="text font-weight-medium mb-5">Data Jadwal Harian</h3>

    <v-card>
      <v-card-title>
        <v-btn class="mx-2" fab dark color="blue" @click="dialogConfirm = true">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>

      <h3 class="text font-weight-medium mb-5 mt-5">Kelas Pagi</h3>
      <table class="table-stripped">
        <tbody>
          <tr v-for="jadwalGroup in sortedJadwalGroups" :key="jadwalGroup.hari">
            <td class="hari">
              {{ jadwalGroup.hari + "," + jadwalGroup.tanggal_jadwal_harian }}
            </td>
            <td v-for="jadwal in jadwalGroup.jadwal_harians">
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
                {{ jadwal.nama_kelas }}
                <br />
                {{ jadwal.nama_instruktur }}
                <br />
                {{ "(" + jadwal.status + ")" }}
                <br />
                {{ jadwal.kapasitas }}
                <br />
                <v-btn
                  v-if="jadwal.status === 'Ada Kelas'"
                  icon
                  small
                  class="mr-2 v-btn--floating"
                  @click="EditLibur(jadwal)"
                >
                  <v-icon color="blue">mdi-book-off</v-icon>
                </v-btn>
                <v-btn
                  v-else-if="jadwal.status === 'Libur'"
                  icon
                  small
                  class="mr-2 v-btn--floating"
                  @click="EditLibur(jadwal)"
                >
                  <v-icon color="blue">mdi-book-off</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="text font-weight-medium mb-5 mt-5">Kelas Sore</h3>
      <table class="table-stripped">
        <tbody>
          <tr v-for="jadwalGroup in sortedJadwalGroups" :key="jadwalGroup.hari">
            <td class="hari">
              {{ jadwalGroup.hari + "," + jadwalGroup.tanggal_jadwal_harian }}
            </td>
            <td v-for="jadwal in jadwalGroup.jadwal_harians">
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
                {{ jadwal.nama_kelas }}
                <br />
                {{ jadwal.nama_instruktur }}
                <br />
                {{ "(" + jadwal.status + ")" }}
                <br />
                {{ jadwal.kapasitas }}
                <br />
                <v-btn
                  v-if="jadwal.status === 'Ada Kelas'"
                  icon
                  small
                  class="mr-2 v-btn--floating"
                  @click="EditLibur(jadwal)"
                >
                  <v-icon color="blue">mdi-book-off</v-icon>
                </v-btn>
                <v-btn
                  v-else-if="jadwal.status === 'Libur'"
                  icon
                  small
                  class="mr-2 v-btn--floating"
                  @click="EditLibur(jadwal)"
                >
                  <v-icon color="blue">mdi-book-off</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>

    <!-- Membuat v-model dialog untuk konfirmasi menambahkan data-->
    <v-dialog v-model="dialogConfirm" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menambahkan data jadwal harian tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="Save()"> Yakin </v-btn>
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
