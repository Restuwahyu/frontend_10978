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
        {
          text: "Tanggal Kadaluarsa Member",
          value: "tanggal_kadaluarsa_member",
        },
        { text: "Total Deposit Kelas", value: "total_deposit_paket" },
        { text: "Total Deposit Uang", value: "total_deposit_uang" },
        { text: "Status Member", value: "status_member" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
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
        total_deposit_paket: [],
        tgl_kadaluarsa_paket: [],
        total_deposit_uang: [],
        tanggal_kadaluarsa_member: [],
        status_member: [],
      },
      deleteId: "",
      showId: "",
      editId: "",
      status_member_text: "Tidak Aktif",
    };
  },
  methods: {
    ReadData() {
      var url = this.$api + "/members";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.members = response.data.data;
        });
    },

    getStatusMemberText(status) {
      if (status === 1) {
        return "Aktif";
      } else {
        return "Tidak Aktif";
      }
    },
  },

  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.ReadData();
  },
};
</script>

<template>
  <v-main class="Member">
    <h3 class="text font-weight-medium mb-5">Data Membership Kadaluarsa</h3>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="members" :search="search">
        <template v-slot:item.status_member="{ item }">
          {{ getStatusMemberText(item.status_member) }}
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
