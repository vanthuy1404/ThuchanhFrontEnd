import React, { useEffect, useState } from "react";
import './QuanLiSinhVien.css';
function QuanLiSinhVien() {
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
        new SinhVien("SV001", "Nguyen Van A", "2000-01-01", "Nam", "CNTT"),
        new SinhVien("SV002", "Tran Thi B", "2000-02-02", "Nữ", "KTPM"),
        new SinhVien("SV003", "Le Van C", "2000-03-03", "Nam", "HTTT"),
        new SinhVien("SV004", "Pham Thi D", "2000-04-04", "Nữ", "CNTT"),
        new SinhVien("SV005", "Hoang Van E", "2000-05-05", "Nam", "KTPM"),
        new SinhVien("SV006", "Do Thi F", "2000-06-06", "Nữ", "HTTT"),
        new SinhVien("SV007", "Bui Van G", "2000-07-07", "Nam", "CNTT"),
        new SinhVien("SV008", "Ngo Thi H", "2000-08-08", "Nữ", "KTPM"),
        new SinhVien("SV009", "Vu Van I", "2000-09-09", "Nam", "HTTT"),
        new SinhVien("SV010", "Dang Thi J", "2000-10-10", "Nữ", "CNTT"),
    ];
    const [dsSinhVien, setDsSinhVien] = useState(arrSV);
    const [keyword, setKeyword] = useState('');
    const [dsachHienThi, setDsachHienThi] = useState(arrSV);
    const[maSV, setMaSV] = useState('');
    const[tenSV, setTenSV] = useState('');
    const[ngaySinh, setNgaySinh] = useState('');
    const[gioiTinh, setGioiTinh] = useState('Nam');
    const[maKhoa, setMaKhoa] = useState('');
    const [dsMASV, setDsMASV] = useState([]);
    useEffect(() => {
        if(keyword === '') {
            setDsachHienThi(dsSinhVien);
        }
    }, [dsSinhVien, keyword]);

    function timKiemSinhVien(keyword) {
        const dsTimKiem = dsSinhVien.filter(sv => sv.TenSV.toLowerCase().includes(keyword.toLowerCase()) || sv.MaSV.toLowerCase().includes(keyword.toLowerCase()));
        return dsTimKiem;
    }  
    function clearForm(){
        document.getElementById('txtMaSV').value = '';
        document.getElementById('txtTenSV').value = '';
        document.getElementById('txtNgaySinh').value = '';
        document.querySelector('input[name="rdbGioiTinh"][value="Nam"]').checked = true;
        document.getElementById('drpKhoa').value = '';  
    }
    const handleTimKiem = ()=>{
        const ketQua = timKiemSinhVien(keyword);
        console.log(keyword);
        if(keyword === '') {
            setDsachHienThi(dsSinhVien);
        } else {
            setDsachHienThi(ketQua);
        }
        console.table(ketQua);
    };
    const handleThemSV = ()=>{
        const checkedExisted =dsSinhVien.some(sv=> sv.MaSV === maSV) 
        if(checkedExisted) {
            alert('Mã sinh viên đã tồn tại');
            return;
        }
        const newSV = new SinhVien(maSV, tenSV, ngaySinh, gioiTinh, maKhoa);
        setDsSinhVien([...dsSinhVien, newSV]);
        setDsachHienThi([...dsSinhVien, newSV]);
        clearForm();
        alert('Thêm sinh viên thành công');
    }  ;

    const handleCapNhat = ()=>{
        if(maSV == ''){
            alert("bạn chưa nhập msv");
            return;
        }
        const index = dsSinhVien.findIndex(sv=> sv.MaSV === maSV);
        if(index!= -1){
            // Tạo mảng mới để tránh việc 2 mảng tham chiếu đến cùng một đối tượng
            const updateSinhVien = new SinhVien(maSV, tenSV, ngaySinh, gioiTinh, maKhoa);
            const dsMoi = [...dsSinhVien];
            dsMoi[index] = updateSinhVien;
            setDsSinhVien(dsMoi);
            setDsachHienThi(dsMoi);
            clearForm();
            alert("Sửa thành công");
        }
        else{

            alert("Sinh viên không tồn tại- kiểm tra lại msv");
        }
    };
    const handleXoaSV =()=>{
        if(dsMASV.length === 0) {
            alert('Bạn chưa chọn sinh viên để xóa');
            return;
        }
        const dsMoi = dsSinhVien.filter(sv=> !dsMASV.includes(sv.MaSV));
        setDsSinhVien(dsMoi);
        setDsachHienThi(dsMoi);
        alert("SÓA thành công :)))");
    }  ;     
    function fillInput(MASV){
        const sv = dsSinhVien.find(sv => sv.MaSV = MASV);
        if(sv){
            document.getElementById('txtMaSV').value = sv.MaSV;
            document.getElementById('txtTenSV').value = sv.TenSV;
            document.getElementById('txtNgaySinh').value = sv.NgaySinh;
            document.querySelector(`input[name="rdbGioiTinh"][value="${sv.GioiTinh}"]`).checked = true;
            document.getElementById('drpKhoa').value = sv.MaKhoa;
            setMaSV(sv.MaSV);
            setTenSV(sv.TenSV);
            setNgaySinh(sv.NgaySinh);
            setGioiTinh(sv.GioiTinh);
            setMaKhoa(sv.MaKhoa);
            
        }
        else {
            alert("Có lỗi xảy ra khi lấy thông tin sinh viên");
        }
    }
    return (
        <>
        <div className="search-form">
            <input type="text" id="searchInput" placeholder="Tìm kiếm sinh viên..." onChange={(e)=>setKeyword(e.target.value)}/>
            <button type="button" className="btn-timkiem" onClick={handleTimKiem}>Tìm kiếm</button>  
        </div>
        <div className="table-student">
            <table id="tbSinhVien">
                <thead>
                    <tr>
                        <th>Chọn</th>
                        <th>Mã SV</th>
                        <th>Tên SV</th>
                        <th>Ngày Sinh</th>
                        <th>Giới Tính</th>
                        <th>Mã Khoa</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody id="tbodySinhVien">
                    {
                        dsachHienThi.map((sv) => (
                            <tr key={sv.MaSV}>
                                <td>
                                    <input type="checkbox" name="chk" id="chk" data-MASV ={sv.MaSV} onClick={()=>{
                                        const checked = document.querySelectorAll('input[name="chk"]:checked');
                                        const selectedMASV = Array.from(checked).map(chk => chk.getAttribute('data-MASV'));
                                        setDsMASV(selectedMASV);
                                    }}/>
                                </td>
                                <td>{sv.MaSV}</td>
                                <td>{sv.TenSV}</td>
                                <td>{sv.NgaySinh}</td>
                                <td>{sv.GioiTinh}</td>
                                <td>{sv.MaKhoa}</td>
                                <td>
                                    <a href="#" onClick={() => fillInput(sv.MaSV)}>Sửa</a>
                                    <a href="#" >Xóa</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <div className="action-form">
            <div className="btn-group">
                <button type="button" id="btnAdd" className="btn btn-primary" onClick={handleThemSV}>Thêm Sinh Viên</button>
                <button type="button" id="btnUpdate" className="btn btn-secondary" onClick={handleCapNhat}>Cập Nhật</button>
                <button type="button" id="btnDelete" className="btn btn-danger" onClick={handleXoaSV}>Xóa Sinh Viên</button>

            </div>
            <div className="form-input">
                <input type="text" id="txtMaSV" placeholder="Mã SV" onChange={(e)=>setMaSV(e.target.value)}/>
                <input type="text" id="txtTenSV" placeholder="Tên SV" onChange={(e)=>setTenSV(e.target.value)}/>
                <input type="date" id="txtNgaySinh" placeholder="Ngày Sinh" onChange={(e)=>setNgaySinh(e.target.value)}/>
                <div className="radio-group">
                    <label><input type="radio" name="rdbGioiTinh" value="Nam" defaultChecked onChange={(e)=>setGioiTinh(e.target.value)}/> Nam</label>
                    <label><input type="radio" name="rdbGioiTinh" value="Nữ" onChange={(e)=>setGioiTinh(e.target.value)}/> Nữ</label>
                </div>
                <select id="drpKhoa" onChange={(e)=>setMaKhoa(e.target.value)}>
                    <option value="">Chọn Khoa</option>
                    <option value="CNTT">Công Nghệ Thông Tin</option>
                    <option value="KTPM">Kỹ Thuật Phần Mềm</option>
                    <option value="HTTT">Hệ Thống Thông Tin</option>
                </select>
            </div>
        </div>
        </>
    );
}
export default QuanLiSinhVien;