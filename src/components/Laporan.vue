<script>
/* eslint-disable */
import { Chart, registerables } from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "pendapatan",
  data() {
    return {
      pendapatan: [
        { text: "Bulan", value: "nama_bulan" },
        { text: "Aktivasi", value: "total_pendapatan_aktivasi" },
        { text: "Deposit", value: "total_pendapatan_deposit" },
      ],
      kelas: [
        { text: "Kelas", value: "kelas" },
        { text: "Instruktur", value: "instruktur" },
        { text: "Jumlah Peserta", value: "jumlah_peserta" },
        { text: "Jumlah Libur", value: "jumlah_libur" },
      ],
      gym: [
        { text: "Tanggal ", value: "tanggal" },
        { text: "Jumlah Member", value: "jumlah_member" },
      ],
      instruktur: [
        { text: "Nama", value: "nama_instruktur" },
        { text: "Jumlah Hadir", value: "jumlah_hadir" },
        { text: "Jumlah Libur", value: "jumlah_izin" },
        { text: "Waktu Terlambat (detik)", value: "jumlah_terlambat" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      chart: null,
      bulan: "",
      tahun: "",
      tanggal_cetak: "",
      pendapatans: [],
      aktivitaskelas: [],
      aktivitasgyms: [],
      kinerjainstrukturs: [],
      selectedYear: null,
      selectedMonth: null,
      selectedMonths: null,
      total: 0,
      availableYears: ["2021", "2022", "2023", "2024", "2025"],
      availableMonth: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      yearDialog: false,
      monthDialog: false,
      monthsDialog: false,
    };
  },

  methods: {
    ReadDataPendapatan() {
      var postData = new FormData();
      postData.append("tahun", this.selectedYear);
      console.log(this.selectedYear);

      var url = this.$api + "/laporan_pendapatan";
      this.$http
        .post(url, postData)
        .then((response) => {
          console.log(response);
          this.pendapatans = response.data.data;
          this.total = response.data.total;
          this.selectedYear = response.data.periode;
          this.tanggal_cetak = response.data.tanggal_cetak;
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
      var postData = new FormData();
      postData.append("bulan", this.selectedMonth);
      console.log(this.selectedMonth);

      var url = this.$api + "/laporan_kelas";
      this.$http
        .post(url, postData)
        .then((response) => {
          this.aktivitaskelas = response.data.data;
          this.bulan = response.data.bulan;
          this.tahun = response.data.tahun;
          this.tanggal_cetak = response.data.tanggal_cetak;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
        });
    },

    ReadDataGym() {
      var url = this.$api + "/laporan_gym";
      this.$http.get(url).then((response) => {
        this.aktivitasgyms = Object.values(response.data.data);
        this.bulan = response.data.bulan;
        this.tahun = response.data.tahun;
        this.tanggal_cetak = response.data.tanggal_cetak;
        console.log(response);
      });
    },

    ReadDataInstruktur() {
      var postData = new FormData();
      postData.append("bulan", this.selectedMonths);

      var url = this.$api + "/laporan_instruktur";
      this.$http
        .post(url, postData)
        .then((response) => {
          this.kinerjainstrukturs = response.data.data;
          this.bulan = response.data.bulan;
          this.tahun = response.data.tahun;
          this.tanggal_cetak = response.data.tanggal_cetak;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
        });
    },

    createChart() {
      const chartData = {
        labels: this.pendapatans.map((item) => item.nama_bulan),
        datasets: [
          {
            label: "Total Pendapatan",
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            data: this.pendapatans.map((item) => item.total_pendapatan),
          },
        ],
      };

      const canvas = document.getElementById("pendapatanChart");
      this.chart = new Chart(canvas, {
        type: "bar",
        data: chartData,
      });
    },

    downloadPDFPendapatan() {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [30, 50],
      });

      // Cetak Kop
      doc.setFont("helvetica", "bold");
      doc.text("GoFit", 1.5, 1);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1.5, 2);
      doc.text(" ", 20, 3);
      doc.setFont("helvetica", "bold");
      doc.text("LAPORAN PENDAPATAN TAHUNAN", 1.5, 4);
      doc.setFont("helvetica", "normal");
      doc.text("Periode: " + this.selectedYear, 1.5, 5);
      doc.text("Tanggal Cetak: " + this.tanggal_cetak, 1.5, 6);
      doc.text("  ", 20, 7);

      // Data tabel
      const tableHeaders = [
        "Bulan",
        "Aktivasi",
        "Deposit",
        "Total Pendapatan/Bulan",
      ];
      const tableData = [];
      const tableRows = document.querySelectorAll(".table-striped tbody tr");
      tableRows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell) => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });
      tableData.push(["Total", "", "", this.total]);

      doc.autoTable({
        startY: 8,
        head: [tableHeaders],
        body: tableData,
        theme: "striped",
        didDrawCell: (data) => {
          // Styling untuk header kolom
          if (data.section === "head") {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.setFillColor(0, 0, 0);
          } else {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.setFillColor(255, 255, 255);
          }
        },
      });

      // Set lebar kolom setelah tabel dibuat
      doc.autoTable({
        startY: 8,
        head: [tableHeaders],
        body: tableData,
        theme: "striped",
        styles: {
          cellWidth: [4, 4, 4, 4], // Mengatur lebar kolom
        },
      });

      doc.addPage();

      const canvas = document.querySelector("#pendapatanChart");
      const dataURL = canvas.toDataURL("image/png");

      const chartHeight = 15;
      const startY =
        doc.getTextDimensions("  ").h / doc.internal.scaleFactor + 7;

      doc.addImage(dataURL, "PNG", 1.5, startY, 30, chartHeight);

      // Save the PDF file
      doc.save("Laporan Pendapatan " + this.selectedYear + ".pdf");
    },

    downloadPDFKelas() {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [30, 20],
      });

      doc.setFont("helvetica", "bold");
      doc.text("GoFit", 1.5, 1);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1.5, 2);
      doc.text(" ", 20, 3);
      doc.setFont("helvetica", "bold");
      doc.text("LAPORAN AKTIVITAS KELAS BULANAN", 1.5, 4);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Bulan: " + this.selectedMonth + "     Tahun: " + this.tahun,
        1.5,
        5
      );
      doc.text("Tanggal Cetak: " + this.tanggal_cetak, 1.5, 6);
      doc.text("  ", 20, 7);

      // Define table headers
      const headers = this.kelas.map((item) => item.text);
      // Extract table data from items array
      const data = this.aktivitaskelas.map((item) => [
        item.kelas,
        item.instruktur,
        item.jumlah_peserta,
        item.jumlah_libur,
      ]);

      const startY =
        doc.getTextDimensions("  ").h / doc.internal.scaleFactor + 7;

      // Set up the table layout
      const tableConfig = {
        head: [headers],
        body: data,
        startY: startY,
      };

      // Add table to the PDF document
      doc.autoTable(tableConfig);

      // Save the PDF file
      doc.save(
        "Laporan Aktivitas Kelas " +
          this.selectedMonth +
          " " +
          this.tahun +
          ".pdf"
      );
    },

    downloadPDFGym() {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [30, 20],
      });

      doc.setFont("helvetica", "bold");
      doc.text("GoFit", 1.5, 1);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1.5, 2);
      doc.text(" ", 20, 3);
      doc.setFont("helvetica", "bold");
      doc.text("LAPORAN AKTIVITAS GYM BULANAN", 1.5, 4);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Bulan: " + this.selectedMonth + "     Tahun: " + this.tahun,
        1.5,
        5
      );
      doc.text("Tanggal Cetak: " + this.tanggal_cetak, 1.5, 6);
      doc.text("  ", 20, 7);

      // Define table headers
      const headers = this.gym.map((item) => item.text);
      // Extract table data from items array
      const data = this.aktivitasgyms.map((item) => [
        item.tanggal,
        item.jumlah_member,
      ]);

      const startY =
        doc.getTextDimensions("  ").h / doc.internal.scaleFactor + 7;

      // Set up the table layout
      const tableConfig = {
        head: [headers],
        body: data,
        startY: startY,
      };

      // Add table to the PDF document
      doc.autoTable(tableConfig);

      // Save the PDF file
      doc.save(
        "Laporan Aktivitas Gym " +
          this.selectedMonth +
          " " +
          this.tahun +
          ".pdf"
      );
    },

    downloadPDFInstruktur() {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [30, 20],
      });

      doc.setFont("helvetica", "bold");
      doc.text("GoFit", 1.5, 1);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1.5, 2);
      doc.text(" ", 20, 3);
      doc.setFont("helvetica", "bold");
      doc.text("LAPORAN KINERJA INSTRUKTUR BULANAN", 1.5, 4);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Bulan: " + this.selectedMonths + "     Tahun: " + this.tahun,
        1.5,
        5
      );
      doc.text("Tanggal Cetak: " + this.tanggal_cetak, 1.5, 6);
      doc.text("  ", 20, 7);

      // Define table headers
      const headers = this.instruktur.map((item) => item.text);
      // Extract table data from items array
      const data = this.kinerjainstrukturs.map((item) => [
        item.nama_instruktur,
        item.jumlah_hadir,
        item.jumlah_izin,
        item.jumlah_terlambat,
      ]);

      const startY =
        doc.getTextDimensions("  ").h / doc.internal.scaleFactor + 7;

      // Set up the table layout
      const tableConfig = {
        head: [headers],
        body: data,
        startY: startY,
      };

      // Add table to the PDF document
      doc.autoTable(tableConfig);

      // Save the PDF file
      doc.save(
        "Laporan Kinerja Instruktur " +
          this.selectedMonths +
          " " +
          this.tahun +
          ".pdf"
      );
    },

    closeDialog() {
      this.yearDialog = false;
      this.monthDialog = false;
      this.monthsDialog = false;
      this.selectedMonths = null;
      this.selectedMonth = null;
      this.selectedYear = null;
    },

    confirmYearDialog() {
      this.yearDialog = false;
      this.ReadDataPendapatan();
    },

    confirmMonthDialog() {
      this.monthDialog = false;
      this.ReadDataKelas();
    },

    confirmMonthsDialog() {
      this.monthsDialog = false;
      this.ReadDataInstruktur();
    },
  },

  watch: {
    pendapatans() {
      if (this.pendapatans && this.pendapatans.length > 0) {
        if (this.chart) {
          this.chart.destroy();
        }
        this.createChart();
      }
    },
  },

  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  created() {
    // Register the required scales
    Chart.register(...registerables);
  },
  mounted() {
    this.ReadDataPendapatan();
    this.ReadDataKelas();
    // this.ReadDataGym();
    this.ReadDataInstruktur();
  },
};
</script>

<template>
  <v-main class="Laporan">
    <!-- Laporan Pendapatan Tahunan -->
    <h3 class="text font-weight-medium">Laporan Pendapatan Tahunan</h3>
    <div class="text font-weight-medium">
      <h3>Periode: {{ selectedYear }}</h3>
      <h3>Tanggal: {{ tanggal_cetak }}</h3>
    </div>
    <v-btn color="primary" dark @click="yearDialog = true"> Pilih Tahun </v-btn
    ><v-btn class="ml-5" color="primary" dark @click="downloadPDFPendapatan()">
      Cetak Laporan
    </v-btn>
    <canvas id="pendapatanChart"></canvas>
    <v-card class="mt-5">
      <div ref="content">
        <table class="table-striped">
          <thead>
            <tr>
              <th>Bulan</th>
              <th>Aktivasi</th>
              <th>Deposit</th>
              <th>Total Pendapatan/Bulan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pendapatans" :key="index">
              <td>{{ item.nama_bulan }}</td>
              <td>{{ item.total_pendapatan_aktivasi }}</td>
              <td>{{ item.total_pendapatan_deposit }}</td>
              <td>{{ item.total_pendapatan }}</td>
            </tr>
          </tbody>
          <tr>
            <td class="total" colspan="3">Total</td>
            <td class="jumlah_total">{{ total }}</td>
          </tr>
        </table>
      </div>
    </v-card>

    <v-dialog v-model="yearDialog" persistent max-width="290">
      <v-card>
        <v-card-title>
          <span class="headline">Pilih Tahun</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedYear"
            :items="availableYears"
            label="Tahun"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeDialog">Batal</v-btn>
          <v-btn color="success" @click="confirmYearDialog">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Laporan Aktivitas Kelas Perbulan -->
    <h3 class="text font-weight-medium mt-10">
      Laporan Aktivitas Kelas Perbulan
    </h3>
    <div class="text font-weight-medium">
      <h3>Bulan: {{ selectedMonth }}</h3>
      <h3>Tahun: {{ tahun }}</h3>
      <h3>Tanggal: {{ tanggal_cetak }}</h3>
      <v-btn color="primary" dark @click="monthDialog = true">
        Pilih Bulan
      </v-btn>
      <v-btn class="ml-5" color="primary" dark @click="downloadPDFKelas()">
        Cetak Laporan
      </v-btn>
    </div>
    <v-card class="mt-5">
      <v-data-table
        :headers="kelas"
        :items="aktivitaskelas"
        disable-pagination
        :hide-default-footer="true"
      >
      </v-data-table>
    </v-card>

    <v-dialog v-model="monthDialog" persistent max-width="290">
      <v-card>
        <v-card-title>
          <span class="headline">Pilih Bulan</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedMonth"
            :items="availableMonth"
            label="Bulan"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeDialog">Batal</v-btn>
          <v-btn color="success" @click="confirmMonthDialog">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Laporan Aktivitas Gym Bulanan -->
    <h3 class="text font-weight-medium mt-10">Laporan Aktivitas Gym Bulanan</h3>
    <div class="text font-weight-medium">
      <h3>Bulan: {{ bulan }}</h3>
      <h3>Tahun: {{ tahun }}</h3>
      <h3>Tanggal: {{ tanggal_cetak }}</h3>
      <v-btn class="ml-5" color="primary" dark @click="downloadPDFGym()">
        Cetak Laporan
      </v-btn>
    </div>
    <v-card class="mt-5">
      <v-data-table
        :headers="gym"
        :items="aktivitasgyms"
        disable-pagination
        :hide-default-footer="true"
      >
      </v-data-table>
    </v-card>

    <!-- Laporan Kinerja Instruktur -->
    <h3 class="text font-weight-medium mt-10">Laporan Kinerja Instruktur</h3>
    <div class="text font-weight-medium">
      <h3>Bulan: {{ selectedMonths }}</h3>
      <h3>Tahun: {{ tahun }}</h3>
      <h3>Tanggal: {{ tanggal_cetak }}</h3>

      <v-btn color="primary" dark @click="monthsDialog = true">
        Pilih Bulan
      </v-btn>
      <v-btn class="ml-5" color="primary" dark @click="downloadPDFInstruktur()">
        Cetak Laporan
      </v-btn>
    </div>
    <v-card class="mt-5">
      <v-data-table
        :headers="instruktur"
        :items="kinerjainstrukturs"
        disable-pagination
        :hide-default-footer="true"
      >
      </v-data-table>
    </v-card>

    <v-dialog v-model="monthsDialog" persistent max-width="290">
      <v-card>
        <v-card-title>
          <span class="headline">Pilih Bulan</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedMonths"
            :items="availableMonth"
            label="Bulan"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeDialog">Batal</v-btn>
          <v-btn color="success" @click="confirmMonthsDialog">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<style scoped>
.table-striped {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.table-striped th,
.table-striped td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-striped tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-striped th {
  background-color: #3888d7;
  color: white;
}

.total {
  background-color: #3888d7;
  color: white;
  font-weight: bold;
}

.jumlah_total {
  font-weight: bold;
  color: black;
  background-color: #f5f5f5;
}
</style>
