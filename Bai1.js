class Khoa {
  constructor(MaKhoa, TenKhoa) {
    this.MaKhoa = MaKhoa;
    this.TenKhoa = TenKhoa;
  }
}
class SinhVien {
  constructor(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa) {
    this.MaSV = MaSV;
    this.TenSV = TenSV;
    this.NgaySinh = NgaySinh;
    this.GioiTinh = GioiTinh;
    this.MaKhoa = MaKhoa;
  }
}
let arrSV = [
  new SinhVien(1, "Ha Anh Nguyen", "1995-02-05", "Nam", "CNTT"),
  new SinhVien(2, "Ha Anh Tuan", "1995-03-05", "Nam", "Văn"),
  new SinhVien(3, "Ly Thien Mai", "1736-03-05", "Nữ", "Toán"),
  new SinhVien(4, "Nguyen Trung Quan", "1999-07-05", "Nam", "Tiếng Anh"),
];
function themSinhVien(sinhvien) {
  arrSV.push(sinhvien);
}
function suaSinhVien(svMoi, MaSV) {
  const index = arrSV.findIndex((sv) => sv.MaSV == MaSV);
  if (index != -1) {
    arrSV[index] = svMoi;
  }
}
function xoaSinhVien(MaSV) {
  arrSV = arrSV.filter((sv) => sv.MaSV != MaSV);
}
function hienthiSinhVien(data) {
  const tbody = document.getElementById("tbDanhSach");
  tbody.innerHTML = "";
  data.forEach((sv) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="checkbox" class ="check" data-masv = "${sv.MaSV}"></td>
                    <td>${sv.MaSV}</td>
                    <td>${sv.TenSV}</td>
                    <td>${sv.NgaySinh}</td>
                    <td>${sv.GioiTinh}</td>
                    <td>${sv.MaKhoa}</td>
                    <td>
    <a href="#" class="btn-edit" data-masv="${sv.MaSV}">Sửa</a>
    <a href="#" class="btn-delete" data-masv="${sv.MaSV}">Xóa</a>
</td>
        `;
    tbody.appendChild(row);
  });
  const editBtns = tbody.querySelectorAll(".btn-edit");
  editBtns.forEach((btn) => {
    btn.onclick = function (e) {
      e.preventDefault();
      const msv = this.dataset.masv;
      const sv = arrSV.find((sv) => sv.MaSV == msv);
      if (sv) {
        document.getElementById("txtMaSV").value = sv.MaSV;
        document.getElementById("txtTenSV").value = sv.TenSV;
        document.getElementById("txtNgaySinh").value = sv.NgaySinh;
        document.querySelector(
          `input[name="rdbGioiTinh"][value="${sv.GioiTinh}"]`
        ).checked = true;
        document.getElementById("drpKhoa").value = sv.MaKhoa;
      }
    };
  });
  const deleteBtns = tbody.querySelectorAll(".btn-delete");
  deleteBtns.forEach((btn) => {
    btn.onclick = function (e) {
      e.preventDefault();
      const msv = this.dataset.masv;
      const isConfirmed = confirm("Bạn có chắc muốn xóa sinh viên này?");
      if (isConfirmed) {
        xoaSinhVien(msv);
        hienthiSinhVien(arrSV);
        alert("Đã xóa sinh viên!");
      }
    };
  });
}

function clearForm() {
  document.getElementById("txtMaSV").value = "";
  document.getElementById("txtTenSV").value = "";
  document.getElementById("txtNgaySinh").value = "";
  document.querySelector(
    'input[name = "rdbGioiTinh"][value="Nam"]'
  ).checked = true;
  document.getElementById("drpKhoa").value = "";
}
function getFormData() {
  const MaSV = document.getElementById("txtMaSV").value;
  const TenSV = document.getElementById("txtTenSV").value;
  const NgaySinh = document.getElementById("txtNgaySinh").value;
  const GioiTinh = document.querySelector(
    'input[name = "rdbGioiTinh"]:checked'
  ).value;
  const MaKhoa = document.getElementById("drpKhoa").value;
  return new SinhVien(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa);
}
function checkExisted(MaSV, data) {
  const index = data.findIndex((sv) => sv.MaSV == MaSV);
  if (index == -1) {
    return false;
  }
  return true;
}

document.getElementById("btnAdd").onclick = function () {
  console.log("Thêm");
  const sv = getFormData();
  if (!sv.MaSV || !sv.TenSV || !sv.NgaySinh || !sv.GioiTinh || !sv.MaKhoa) {
    alert("Vui lòng nhập đầy đủ các trường");
    return;
  }
  if (checkExisted(sv.MaSV, arrSV)) {
    alert("Mã sinh viên đã tồn tại");
    return;
  }
  themSinhVien(sv);
  alert("Thêm thành công");
  hienthiSinhVien(arrSV);
  clearForm();
};
document.getElementById("btnUpdate").onclick = function () {
  console.log("Sửa");
  const sv = getFormData();
  if (!sv.MaSV || !sv.TenSV || !sv.NgaySinh || !sv.GioiTinh || !sv.MaKhoa) {
    alert("Vui lòng nhập đầy đủ các trường");
    return;
  }
  if (checkExisted(sv.MaSV, arrSV)) {
    suaSinhVien(sv, sv.MaSV);
    alert("Cập nhật thành công");
    hienthiSinhVien(arrSV);
    clearForm();
    return;
  }
  alert("Sinh viên chưa tồn tại");
};
document.getElementById("btnDelete").onclick = function () {
  console.log("Xóa sinh viên");
  const checks = Array.from(document.querySelectorAll(".check:checked"));
  if (!checks.length) {
    alert("Chưa có sinh viên nào được chọn");
    return;
  }
  const arrMSV = checks.map((c) => c.dataset.masv);
  console.log(arrMSV);
  const isConfirmed = confirm("Bạn có chắc muốn xóa không?");
  if (isConfirmed) {
    arrMSV.forEach((msv) => xoaSinhVien(msv));
    alert("Xóa thành công");
    hienthiSinhVien(arrSV);
  }
  return;
};
document.getElementById("btnTimkiem").onclick = function () {
  const keyword = document.getElementById("txtTuKhoa").value.toLowerCase();
  console.log(keyword);
  const ketQua = arrSV.filter(
    (sv) =>
      sv.MaSV.toString().toLowerCase().includes(keyword) ||
      sv.TenSV.toLowerCase().includes(keyword) ||
      sv.NgaySinh.toLowerCase().includes(keyword) ||
      sv.GioiTinh.toLowerCase().includes(keyword) ||
      sv.MaKhoa.toLowerCase().includes(keyword)
  );
  console.log(ketQua);
  document.getElementById("search-result").innerHTML =
    "Kết quả tìm kiếm dưới bảng sau:";
  hienthiSinhVien(ketQua);
  return;
};
document.getElementById('txtTuKhoa').oninput = function() {
    const keyword = this.value.trim().toLowerCase();
    if (keyword === '') {
        hienthiSinhVien(arrSV);
        document.getElementById("search-result").innerHTML = "";
    }
};
hienthiSinhVien(arrSV);
