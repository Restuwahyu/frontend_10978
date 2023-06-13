<script>
/* eslint-disable */
export default {
  name: "Member",
  data() {
    return {
      headers: [
        { text: "ID Member", value: "id_member" },
        {
          text: "Nama Member",
          align: "start",
          sortable: true,
          value: "nama_member",
        },
        { text: "Alamat", value: "alamat_member" },
        { text: "Tanggal Gabung Member", value: "tgl_gabung_member" },
        { text: "Total Deposit Uang", value: "total_deposit_uang" },
        { text: "Status Member", value: "status_member" },
        { text: "Action", value: "actions" },
      ],
      inputType: "Baca",
      load: false,
      snackbar: false,
      dialogTambah: false,
      dialogUbah: false,
      dialogConfirm: false,
      dialogConfirmDelete: false,
      dialogConfirmEdit: false,
      dialogConfirmReset: false,
      dialogConfirmDeaktivasi: false,
      dialogConfirmDeaktivasiAll: false,
      error_message: "",
      color: "",
      search: "",
      member: new FormData(),
      members: [],
      form: {
        nama_member: [],
        tanggal_lahir_member: [],
        alamat_member: [],
        password_member: [],
        no_telp_member: [],
        email_member: [],
        tgl_gabung_member: [],
      },
      deleteId: "",
      editId: "",
      status_member_text: "Tidak Aktif",
    };
  },
  methods: {
    setForm() {
      if (this.inputType === "Ubah") {
        this.Update();
      } else if (this.inputType === "Deaktivasi") {
        this.DeaktivasiMember();
      } else if (this.inputType === "Baca") {
        this.ReadData();
      } else {
        this.Save();
      }
    },

    ReadData() {
      var url = this.$api + "/member";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.members = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Save() {
      this.member.append("nama_member", this.form.nama_member);
      this.member.append(
        "tanggal_lahir_member",
        this.form.tanggal_lahir_member
      );
      this.member.append("alamat_member", this.form.alamat_member);
      this.member.append("password_member", this.form.password_member);
      this.member.append("no_telp_member", this.form.no_telp_member);
      this.member.append("email_member", this.form.email_member);
      this.member.append("tgl_gabung_member", this.form.tgl_gabung_member);

      var url = this.$api + "/member";
      this.load = true;
      this.$http
        .post(url, this.member, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.members = response.data;
          this.Close();
          this.ResetForm();
          this.inputType = "Baca";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Update() {
      var data = new FormData();
      data.append("nama_member", this.form.nama_member);
      data.append("tanggal_lahir_member", this.form.tanggal_lahir_member);
      data.append("alamat_member", this.form.alamat_member);
      data.append("password_member", this.form.password_member);
      data.append("no_telp_member", this.form.no_telp_member);
      data.append("email_member", this.form.email_member);

      var url = this.$api + "/member/" + this.editId;
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

    ResetPass() {
      var data = new FormData();
      data.append("password_member", this.form.tanggal_lahir_member);
      var url = this.$api + "/member/" + this.editId;
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
          this.ResetPass();
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
      var url = this.$api + "/member/" + this.deleteId;
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
          this.load = false;
          this.snackbar = true;
          this.Close();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    DeaktivasiMember() {
      var url = this.$api + "/members/" + this.deaktivasiId;
      this.load = true;
      this.$http
        .post(url, {
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
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    DeaktivasiAllMember() {
      var url = this.$api + "/members";
      this.load = true;
      this.$http
        .post(url, {
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
      this.editId = item.id_member;
      this.form.nama_member = item.nama_member;
      this.form.tanggal_lahir_member = item.tanggal_lahir_member;
      this.form.alamat_member = item.alamat_member;
      this.form.password_member = item.password_member;
      this.form.no_telp_member = item.no_telp_member;
      this.form.email_member = item.email_member;
      this.form.tgl_gabung_member = item.tgl_gabung_member;
      console.log(this.form.alamat_member);
      console.log(this.form.password_member);
      console.log(this.form.no_telp_member);
      console.log(this.form.email_member);
      this.dialogUbah = true;
    },

    DeleteHandler(id_member) {
      this.deleteId = id_member;
      this.dialogConfirmDelete = true;
    },

    ResetPasswordHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_member;
      this.form.password_member = item.tanggal_lahir_member;
      this.dialogConfirmReset = true;
    },

    DeaktivasiHandler(item) {
      this.inputType = "Deaktivasi";
      this.deaktivasiId = item.id_member;
      console.log(this.deaktivasiId);
      this.dialogConfirmDeaktivasi = true;
    },

    Close() {
      this.dialogTambah = false;
      this.dialogUbah = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.dialogConfirmReset = false;
      this.dialogConfirmDeaktivasi = false;
      this.dialogConfirmDeaktivasiAll = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.dialogTambah = false;
      this.dialogUbah = false;
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.dialogConfirmReset = false;
      this.dialogConfirmDeaktivasi = false;
      this.dialogConfirmDeaktivasiAll = false;
      this.inputType = "Tambah";
    },

    ResetPass() {
      this.form = {
        password_member: [],
      };
    },

    ResetForm() {
      this.form = {
        nama_member: [],
        tanggal_lahir_member: [],
        alamat_member: [],
        password_member: [],
        no_telp_member: [],
        email_member: [],
        tgl_gabung_member: [],
      };
    },

    getStatusMemberText(status) {
      if (status === 1) {
        return "Aktif";
      } else {
        return "Tidak Aktif";
      }
    },

    formatRP(item) {
      let val = (item / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
    membersToArray() {
      return Object.values(this.members);
    },
  },
  mounted() {
    this.ReadData();
  },
};
</script>

<template>
  <v-main class="Member">
    <h3 class="text font-weight-medium mb-5">Data Member</h3>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          fab
          dark
          color="grey"
          @click="dialogConfirmDeaktivasiAll = true"
        >
          <v-icon dark>mdi-account-cancel-outline</v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark color="blue" @click="dialogTambah = true">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="membersToArray" :search="search">
        <template v-slot:item.total_deposit_uang="{ item }">
          Rp.{{ formatRP(item.total_deposit_uang) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            class="mr-2 v-btn--floating"
            color="primary"
            @click="EditHandler(item)"
          >
            <v-icon color="yellow">mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2 v-btn--floating"
            @click="DeleteHandler(item.id_member)"
          >
            <v-icon color="red">mdi-delete-forever</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="v-btn--floating"
            @click="ResetPasswordHandler(item)"
          >
            <v-icon color="green">mdi-lock-reset</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="v-btn--floating"
            @click="DeaktivasiHandler(item)"
          >
            <v-icon color="grey">mdi-account-cancel</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.status_member="{ item }">
          {{ getStatusMemberText(item.status_member) }}
        </template>
      </v-data-table>
    </v-card>

    <!-- Membuat v-model dialog tambah -->
    <v-dialog v-model="dialogTambah" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline"> Tambah Data Member</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.nama_member"
              label="Nama Member"
            ></v-text-field>
            <v-text-field
              type="date"
              v-model="form.tanggal_lahir_member"
              label="Tanggal lahir"
            ></v-text-field>
            <v-text-field
              v-model="form.alamat_member"
              label="Alamat Member"
            ></v-text-field>
            <v-text-field
              v-model="form.password_member"
              label="Password Member"
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp_member"
              label="Nomor Telepon Member"
            ></v-text-field>
            <v-text-field
              v-model="form.email_member"
              label="Email Member"
            ></v-text-field>
            <v-text-field
              type="date"
              v-model="form.tgl_gabung_member"
              label="Tanggal Gabung Member"
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

    <!-- Membuat v-model dialog ubah -->
    <v-dialog v-model="dialogUbah" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline"> Ubah Data Member</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.nama_member"
              label="Nama Member"
            ></v-text-field>
            <v-text-field
              type="date"
              v-model="form.tanggal_lahir_member"
              label="Tanggal lahir"
            ></v-text-field>
            <v-text-field
              v-model="form.alamat_member"
              label="Alamat Member"
            ></v-text-field>
            <v-text-field
              v-model="form.password_member"
              label="Password Member"
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp_member"
              label="Nomor Telepon Member"
            ></v-text-field>
            <v-text-field
              v-model="form.email_member"
              label="Email Member"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="blue darken-1" text @click="dialogConfirmEdit = true">
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
          Apakah Anda yakin akan menambahkan data member tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="Save()"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi edit data-->
    <v-dialog v-model="dialogConfirmEdit" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menyimpan perubahan data member tersebut?
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
          Apakah Anda yakin akan menghapus data member tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="DeleteData"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi mengatur ulang kata sandi-->
    <v-dialog v-model="dialogConfirmReset" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan mengatur ulang kata sandi data member tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="ResetPass"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi mendaktivasi member-->
    <v-dialog v-model="dialogConfirmDeaktivasi" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan mendaktivasi member tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="DeaktivasiMember">
            Yakin
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi mendaktivasi member-->
    <v-dialog v-model="dialogConfirmDeaktivasiAll" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan mendaktivasi semua member yang kadaluarsa?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="DeaktivasiAllMember">
            Yakin
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
