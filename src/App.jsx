import React, { useState, useEffect } from "react";
import {
  Clock,
  User,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

// --- HÀM HỖ TRỢ ĐẢO NGẪU NHIÊN ---
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- DỮ LIỆU CÂU HỎI KHỐI 12 ---
const mcqDataOriginal = [
  {
    id: 1,
    text: "Pseudo-class trong CSS được sử dụng để làm gì?",
    options: {
      A: "Thay đổi màu nền của trang web",
      B: "Định nghĩa kiểu chữ đặc biệt",
      C: "Tạo hiệu ứng động cho các hình ảnh",
      D: "Tạo các lớp giả định mô tả trạng thái của phần tử HTML",
    },
    correct: "D",
  },
  {
    id: 2,
    text: "Trong trường hợp có nhiều mẫu định dạng CSS áp dụng cho cùng một phần tử, quy tắc nào được ưu tiên cao nhất?",
    options: {
      A: "Mẫu định dạng có trọng số cao nhất",
      B: "Mẫu định dạng đầu tiên trong tệp CSS",
      C: "Mẫu định dạng có thuộc tính màu sắc",
      D: "Mẫu định dạng có thứ tự cuối cùng",
    },
    correct: "A",
  },
  {
    id: 3,
    text: "Trọng số CSS không bao gồm yếu tố nào sau đây trong cách tính?",
    options: {
      A: "Số lượng thẻ HTML",
      B: "Số lượng thuộc tính",
      C: "Số lượng ID",
      D: "Số lượng class",
    },
    correct: "B",
  },
  {
    id: 4,
    text: "Tệp CSS được sử dụng trong thiết kế web để làm gì?",
    options: {
      A: "Định dạng hình ảnh",
      B: "Định dạng văn bản",
      C: "Định dạng âm thanh",
      D: "Định dạng trang web một cách thống nhất",
    },
    correct: "D",
  },
  {
    id: 5,
    text: "Lớp CSS nào thường được tạo để hiển thị các ô theo chiều ngang trong một bố cục?",
    options: { A: "Header", B: "Row", C: "Slogan", D: "Content" },
    correct: "B",
  },
  {
    id: 6,
    text: "Một trong những công việc liên quan đến phần mềm trong sửa chữa và bảo trì máy tính là gì?",
    options: {
      A: "Thay thế bo mạch chủ",
      B: "Thay màn hình có độ phân giải cao",
      C: "Cài đặt, cấu hình các phần mềm thông dụng",
      D: "Lắp đặt thêm thiết bị mạng",
    },
    correct: "C",
  },
  {
    id: 7,
    text: "Ngành học nào chú trọng đào tạo về nguyên lý hoạt động và giải quyết các vấn đề phức tạp trong lĩnh vực máy tính?",
    options: {
      A: "Trung cấp nghề",
      B: "Đại học",
      C: "Đào tạo ngắn hạn",
      D: "Cao đẳng nghề",
    },
    correct: "B",
  },
  {
    id: 8,
    text: "Chuyên gia quản trị mạng có nhiệm vụ chính nào sau đây?",
    options: {
      A: "Lập trình phần mềm ứng dụng",
      B: "Kiểm thử phần mềm",
      C: "Thiết kế đồ họa",
      D: "Quản lý và duy trì hệ thống mạng",
    },
    correct: "D",
  },
  {
    id: 9,
    text: "Tại sao nhu cầu về chuyên gia bảo mật thông tin ngày càng tăng mạnh?",
    options: {
      A: "Do nhu cầu về game trực tuyến",
      B: "Do sự phát triển của thể thao điện tử",
      C: "Do sự phát triển của lĩnh vực giải trí",
      D: "Do nguy cơ tấn công mạng ngày càng phức tạp",
    },
    correct: "D",
  },
  {
    id: 10,
    text: "Mục tiêu chính của hội thảo hướng nghiệp Tin học là gì?",
    options: {
      A: "Tìm hiểu về các phần mềm mới",
      B: "Kết nối với các doanh nghiệp lớn",
      C: "Thảo luận về các ngành nghề không liên quan đến CNTT",
      D: "Tìm hiểu các ngành sử dụng nhân lực CNTT và vai trò của chuyên viên",
    },
    correct: "D",
  },
  {
    id: 11,
    text: "Thuật ngữ 'server' trong mạng máy tính có nghĩa là gì?",
    options: {
      A: "Thiết bị kết nối không dây",
      B: "Máy tính yêu cầu dịch vụ từ máy chủ",
      C: "Máy tính cung cấp dịch vụ cho các máy khác",
      D: "Bộ lặp tín hiệu",
    },
    correct: "C",
  },
  {
    id: 12,
    text: "Sự khác biệt chính giữa hub và switch là gì?",
    options: {
      A: "Hub kết nối tạm thời giữa các máy tính, còn switch truyền tín hiệu đồng thời",
      B: "Switch không cần số cổng nhiều như hub",
      C: "Hub có tốc độ truyền dữ liệu nhanh hơn switch",
      D: "Hub chia tín hiệu cho tất cả các cổng, còn switch kết nối tạm thời giữa hai cổng",
    },
    correct: "D",
  },
  {
    id: 13,
    text: "Cấu trúc chung của một trang web đầy đủ nhất bao gồm mấy phần chính?",
    options: { A: "2 phần", B: "3 phần", C: "4 phần", D: "5 phần" },
    correct: "B",
  },
  {
    id: 14,
    text: "Phần đầu trang (Header) của website thường không chứa thông tin nào sau đây?",
    options: {
      A: "Logo và tên trang",
      B: "Thanh điều hướng",
      C: "Bản quyền và thông tin liên hệ",
      D: "Hình nền và thông tin nổi bật",
    },
    correct: "C",
  },
  {
    id: 15,
    text: "Favicon của một trang web là gì?",
    options: {
      A: "Hình ảnh lớn nhất nằm ở phần thân trang",
      B: "Biểu tượng đại diện hiển thị trên tab của trình duyệt web",
      C: "Nút bấm để chuyển về trang chủ",
      D: "Đoạn mã ẩn dùng để bảo mật web",
    },
    correct: "B",
  },
  {
    id: 16,
    text: "Phần thân trang (Body) thường được tổ chức và bố cục dưới dạng nào?",
    options: {
      A: "Các khối hình chữ nhật chứa nội dung",
      B: "Một danh sách dài không phân chia",
      C: "Các vòng tròn lồng vào nhau",
      D: "Một bảng duy nhất",
    },
    correct: "A",
  },
  {
    id: 17,
    text: "Các bước xây dựng một trang web thường bắt đầu bằng việc gì?",
    options: {
      A: "Chuẩn bị tư liệu và chọn phần mềm",
      B: "Xây dựng thiết kế và dàn ý",
      C: "Định hình ý tưởng (xác định mục đích, đối tượng)",
      D: "Công bố trang web",
    },
    correct: "C",
  },
  {
    id: 18,
    text: "Tại sao khi xây dựng web lại cần phải xác định đối tượng người dùng?",
    options: {
      A: "Để thu phí truy cập của họ",
      B: "Để biết người dùng mong muốn tìm thông tin gì, từ đó thiết kế nội dung phù hợp",
      C: "Để báo cáo với nhà cung cấp dịch vụ Internet",
      D: "Để lập danh sách chặn các truy cập trái phép",
    },
    correct: "B",
  },
  {
    id: 19,
    text: "Thiết kế mĩ thuật cho trang web (chọn phông chữ, bảng màu) có ý nghĩa gì?",
    options: {
      A: "Làm tăng dung lượng của trang web",
      B: "Làm cho trang web tải nhanh hơn",
      C: "Phù hợp thẩm mĩ người dùng, gây ấn tượng và tăng sức thuyết phục của nội dung",
      D: "Tự động dịch nội dung trang web sang nhiều ngôn ngữ",
    },
    correct: "C",
  },
  {
    id: 20,
    text: "Phông chữ loại nào thường được dùng để trình bày nội dung bài viết trên trang web để dễ đọc trên màn hình?",
    options: {
      A: "Phông chữ có chân (Serif) như Times New Roman",
      B: "Phông chữ viết tay (Cursive)",
      C: "Phông chữ trừu tượng (Fantasy)",
      D: "Phông chữ không chân (Sans Serif) như Arial, Calibri",
    },
    correct: "D",
  },
  {
    id: 21,
    text: "Google Sites lưu trữ các tệp dữ liệu trang web của người dùng ở đâu?",
    options: {
      A: "Ổ cứng máy tính cá nhân",
      B: "Google Drive của người dùng",
      C: "Bộ nhớ của trình duyệt web",
      D: "Google Photos",
    },
    correct: "B",
  },
  {
    id: 22,
    text: "Phần đầu trang của Google Sites hỗ trợ các kích thước nào (Loại tiêu đề)?",
    options: {
      A: "Chỉ có một kích thước duy nhất",
      B: "Hình vuông, Hình tròn, Chữ nhật",
      C: "Bìa, Biểu ngữ lớn, Biểu ngữ, Chỉ có tiêu đề",
      D: "Trái, Phải, Giữa, Đều",
    },
    correct: "C",
  },
  {
    id: 23,
    text: "Khi chèn ảnh nền vào phần đầu trang bằng Google Sites, thao tác nào giúp chữ trên tiêu đề dễ đọc hơn?",
    options: {
      A: "Thu nhỏ ảnh nền lại",
      B: "Tự động điều chỉnh độ sáng của ảnh",
      C: "Đổi phông chữ thành màu đen",
      D: "Kéo ảnh nền ra ngoài vùng hiển thị",
    },
    correct: "B",
  },
  {
    id: 24,
    text: "Để xem trước trang web trên Google Sites (hiển thị trên máy tính/điện thoại) trước khi xuất bản, ta dùng biểu tượng nào?",
    options: {
      A: "Biểu tượng hình con mắt / màn hình máy tính (Xem trước)",
      B: "Biểu tượng Undo",
      C: "Biểu tượng hình răng cưa (Cài đặt)",
      D: "Biểu tượng cái ghim (Đường liên kết)",
    },
    correct: "A",
  },
  {
    id: 25,
    text: "Nút lệnh 'Công bố' (Publish) trên Google Sites có tác dụng gì?",
    options: {
      A: "Lưu nháp trang web",
      B: "Chuyển trang web thành tệp PDF",
      C: "Xuất bản trang web lên Internet cho người khác truy cập",
      D: "Xóa trang web khỏi hệ thống",
    },
    correct: "C",
  },
  {
    id: 26,
    text: "Trong giao diện tạo phần thân trang của Google Sites, bảng chọn 'Chèn' không có nhóm lệnh nào sau đây?",
    options: {
      A: "Chèn hộp văn bản, hình ảnh",
      B: "Chèn các thành phần nội dung (bố cục khối)",
      C: "Chèn hiệu ứng hoạt hình (Animation 3D)",
      D: "Chèn các đối tượng khác (Bản đồ, Youtube, Lịch...)",
    },
    correct: "C",
  },
  {
    id: 27,
    text: "Để chia phần thân trang web thành 2 khối nội dung đặt cạnh nhau, ta sử dụng công cụ nào trong Google Sites?",
    options: {
      A: "Kẻ bảng HTML thủ công",
      B: "Chọn mẫu trong nhóm 'Thành phần nội dung' (Bố cục) ở bảng chọn Chèn",
      C: "Chọn mục 'Thu gọn văn bản'",
      D: "Dùng nút Space (dấu cách) để đẩy hình ảnh sang bên",
    },
    correct: "B",
  },
  {
    id: 28,
    text: "Khi chèn Google Maps vào trang web bằng Google Sites, thao tác nào là đúng?",
    options: {
      A: "Bảng chọn Chèn → Chọn Bản đồ → Nhập vị trí và chọn Đặt dấu vị trí",
      B: "Mở thẻ HTML và tự viết mã nhúng iframe",
      C: "Chụp ảnh màn hình Google Maps và tải lên dạng tệp .jpg",
      D: "Nhập địa chỉ nhà vào ô văn bản bình thường",
    },
    correct: "A",
  },
  {
    id: 29,
    text: "Nếu lỡ tay xóa nhầm một khối nội dung trong Google Sites, bạn có thể khôi phục lại bằng nút lệnh nào?",
    options: { A: "Redo", B: "Refresh", C: "Undo (Hoàn tác)", D: "Delete" },
    correct: "C",
  },
  {
    id: 30,
    text: "Phần chân trang trong Google Sites thường được sử dụng để làm gì?",
    options: {
      A: "Chứa logo và tên trang web chính",
      B: "Đặt các banner quảng cáo khổng lồ",
      C: "Đưa bản đồ chi tiết của từng bài viết",
      D: "Chứa thông tin bản quyền, thông tin liên hệ và liên kết mạng xã hội",
    },
    correct: "D",
  },
  {
    id: 31,
    text: "Để gắn liên kết mạng xã hội (Facebook, YouTube...) vào chân trang web trên Google Sites, ta thực hiện thế nào?",
    options: {
      A: "Chọn 'Đường liên kết đến mạng xã hội' và nhập địa chỉ URL",
      B: "Chèn một hộp văn bản và gõ tên mạng xã hội",
      C: "Nhập mã HTML thủ công",
      D: "Chỉ cần tải ảnh logo Facebook lên",
    },
    correct: "A",
  },
  {
    id: 32,
    text: "Tổ chức website theo cấu trúc hình cây mang lại lợi ích gì?",
    options: {
      A: "Tăng cường khả năng bảo mật của trang web",
      B: "Giảm dung lượng ảnh lưu trữ",
      C: "Giúp phân bổ thông tin khoa học, bố cục cân đối và dễ dàng điều hướng",
      D: "Tự động tạo biểu mẫu thu thập dữ liệu",
    },
    correct: "C",
  },
  {
    id: 33,
    text: "Trang con trong một website là gì?",
    options: {
      A: "Một trang web hoàn toàn độc lập, khác tên miền với trang chủ",
      B: "Một website khác mà ta liên kết tới",
      C: "Một trang nháp chưa được xuất bản",
      D: "Trang web nằm ở cấp thấp hơn, được mở ra từ bảng chọn của trang chủ",
    },
    correct: "D",
  },
  {
    id: 34,
    text: "Thao tác tạo trang con trong Google Sites nằm ở bảng chọn nào?",
    options: {
      A: "Bảng chọn 'Chèn'",
      B: "Bảng chọn 'Giao diện'",
      C: "Bảng chọn 'Trang'",
      D: "Bảng chọn 'Cài đặt'",
    },
    correct: "C",
  },
  {
    id: 35,
    text: "Trên điện thoại, thanh điều hướng (bảng chọn) của Google Sites tự động hiển thị ở đâu?",
    options: {
      A: "Nằm tràn khắp màn hình",
      B: "Ẩn hoàn toàn không thể bấm",
      C: "Ở cuối trang",
      D: "Nút Menu thu gọn nằm ở phía trên (bên cạnh logo)",
    },
    correct: "D",
  },
  {
    id: 36,
    text: "Đường dẫn URL tương đối thường được dùng trong trường hợp nào?",
    options: {
      A: "Liên kết tới một trang web khác nằm ngoài website của mình",
      B: "Liên kết trỏ tới các trang con bên trong cùng một website của mình",
      C: "Liên kết tải tệp tin từ một máy chủ khác",
      D: "Liên kết tới một trang mạng xã hội",
    },
    correct: "B",
  },
  {
    id: 37,
    text: "Để gắn một liên kết vào cụm từ 'Đọc tiếp' trong một bài viết, ta làm như thế nào trên Google Sites?",
    options: {
      A: "Bôi đen cụm từ, nháy nút 'Chèn đường liên kết' và chọn trang đích",
      B: "Gõ trực tiếp địa chỉ URL cạnh cụm từ đó",
      C: "Tô màu đỏ cho cụm từ đó",
      D: "Dùng lệnh Chèn → Hình ảnh",
    },
    correct: "A",
  },
  {
    id: 38,
    text: "Google Forms là công cụ chủ yếu được sử dụng để làm gì trên trang web?",
    options: {
      A: "Viết các bài báo dài",
      B: "Tạo biểu mẫu thu thập dữ liệu và ý kiến phản hồi của người dùng",
      C: "Thiết kế logo động",
      D: "Tự động trả lời tin nhắn của khách hàng",
    },
    correct: "B",
  },
  {
    id: 39,
    text: "Khi thiết kế biểu mẫu trong Google Forms, nếu muốn người dùng chỉ được chọn 1 giới tính (Nam/Nữ), ta dùng kiểu câu hỏi nào?",
    options: {
      A: "Hộp kiểm (Checkbox)",
      B: "Lưới lựa chọn",
      C: "Ngày tháng",
      D: "Trắc nghiệm (Radio button / Nhiều lựa chọn)",
    },
    correct: "D",
  },
  {
    id: 40,
    text: "Để đưa một biểu mẫu Google Forms vào trang web làm bằng Google Sites, ta sử dụng tính năng gì?",
    options: {
      A: "Chèn → Biểu mẫu",
      B: "Chèn → Hộp văn bản",
      C: "Giao diện → Đơn giản",
      D: "Trang → Thêm trang con",
    },
    correct: "A",
  },
  {
    id: 41,
    text: "Sau khi người dùng điền và gửi biểu mẫu, người quản trị có thể xem kết quả thống kê dạng biểu đồ trực quan ở đâu?",
    options: {
      A: "Trong mục 'Bản tóm tắt' (Summary) ở phần Câu trả lời của Google Forms",
      B: "Trong Google Drive",
      C: "Trong Google Maps",
      D: "Trực tiếp trên giao diện của Google Sites",
    },
    correct: "A",
  },
  {
    id: 42,
    text: "Dữ liệu thu thập từ Google Forms có thể được tải xuống dưới định dạng phần mềm nào để dễ dàng xử lý tính toán?",
    options: {
      A: "Google Docs (Văn bản)",
      B: "Google Slides (Trình chiếu)",
      C: "Google Sheets (Bảng tính / Trang tính)",
      D: "Google Sites",
    },
    correct: "C",
  },
  {
    id: 43,
    text: "Nhúng (Embed) iframe vào trang web nhằm mục đích gì?",
    options: {
      A: "Đổi màu chữ của đoạn văn",
      B: "Tạo một khung nhìn chứa tài nguyên web hoặc trang web khác ngay trong trang web hiện tại",
      C: "Vẽ các đường viền xung quanh ảnh",
      D: "Xóa các đoạn mã HTML bị lỗi",
    },
    correct: "B",
  },
  {
    id: 44,
    text: "Trong HTML, thẻ <input type='checkbox'> được dùng để làm gì?",
    options: {
      A: "Tạo nút bấm Gửi (Submit)",
      B: "Tạo trường nhập mật khẩu (bị che lấp)",
      C: "Tạo ô lựa chọn giá trị có hoặc không (có thể chọn nhiều ô)",
      D: "Tạo vùng tải tệp lên",
    },
    correct: "C",
  },
  {
    id: 45,
    text: "Khi muốn trang web trên Google Sites có bảng chọn (menu) trải dài theo chiều ngang ở phía trên, ta phải làm gì?",
    options: {
      A: "Cài đặt → Điều hướng → Chế độ Bên",
      B: "Cài đặt → Điều hướng → Chế độ Trên cùng",
      C: "Không thể làm được vì Google Sites chỉ có menu dọc",
      D: "Chèn một Hộp văn bản dài",
    },
    correct: "B",
  },
  {
    id: 46,
    text: "Mẫu giao diện (Themes) trong Google Sites cung cấp sẵn những gì?",
    options: {
      A: "Các bài viết mẫu về địa lý",
      B: "Tập hợp các quy định về bảng màu, phông chữ, thiết kế đầu trang",
      C: "Thư viện video Youtube",
      D: "Các câu hỏi trắc nghiệm",
    },
    correct: "B",
  },
  {
    id: 47,
    text: "Người dùng có thể tùy chỉnh màu sắc trong một mẫu giao diện có sẵn của Google Sites bằng cách nào?",
    options: {
      A: "Dùng bình xịt màu vẽ trực tiếp lên màn hình",
      B: "Nháy chuột vào bảng chọn sắc thái màu (thùng sơn) trong phần Giao diện",
      C: "Tải tệp CSS từ máy tính lên",
      D: "Gõ lệnh lập trình HTML/CSS phức tạp",
    },
    correct: "B",
  },
  {
    id: 48,
    text: "Yêu cầu 'Bố cục logic, khoa học, phù hợp, hình ảnh chất lượng tốt' thuộc tiêu chí đánh giá nào khi xây dựng website?",
    options: {
      A: "Tiêu chí tính sáng tạo",
      B: "Tiêu chí tương tác",
      C: "Tiêu chí hình thức",
      D: "Tiêu chí nội dung",
    },
    correct: "C",
  },
  {
    id: 49,
    text: "Trong đánh giá đồng đẳng (Peer review) dự án website, nguyên tắc quan trọng nhất là gì?",
    options: {
      A: "Đánh giá dựa trên sở thích cá nhân",
      B: "Đánh giá công bằng, bám sát tiêu chí, tinh thần xây dựng",
      C: "Cho điểm tối đa cho tất cả các nhóm",
      D: "Chỉ tập trung chê bai lỗi sai",
    },
    correct: "B",
  },
  {
    id: 50,
    text: "Việc phân chia một website thành 'Trang chủ' và nhiều 'Trang con' (Cấu trúc hình cây) giúp giải quyết vấn đề gì trực tiếp nhất?",
    options: {
      A: "Giảm chi phí thiết kế web",
      B: "Tránh việc trang chủ quá dài, mất cân đối và làm người dùng rối mắt",
      C: "Tự động kiểm duyệt lỗi chính tả",
      D: "Tăng tốc độ đường truyền mạng",
    },
    correct: "B",
  },
  {
    id: 51,
    text: "Để thay đổi thứ tự các trang web trong bảng chọn menu của Google Sites, bạn cần thao tác ở đâu?",
    options: {
      A: "Bảng chọn 'Trang', dùng chuột kéo thả các trang lên xuống",
      B: "Bảng chọn 'Chèn', chọn nút Xóa",
      C: "Bảng chọn 'Giao diện', đổi màu sắc",
      D: "Gõ mã lệnh sắp xếp (Sort)",
    },
    correct: "A",
  },
  {
    id: 52,
    text: "Đặc điểm của 'Đường dẫn tương đối' trong HTML là gì?",
    options: {
      A: "Bắt buộc phải có http:// hoặc https://",
      B: "Bắt buộc phải có tên miền (domain name)",
      C: "Chỉ cần tên đường dẫn/tên tệp từ vị trí tài liệu hiện tại (thường dùng liên kết trong cùng website)",
      D: "Rất dài và phức tạp",
    },
    correct: "C",
  },
  {
    id: 53,
    text: "Thẻ <label> trong biểu mẫu HTML có ý nghĩa gì khi kết hợp với thẻ <input>?",
    options: {
      A: "Che giấu dữ liệu người dùng nhập",
      B: "Định nghĩa nhãn; khi nhấp vào nhãn, con trỏ sẽ được đưa vào vùng input tương ứng",
      C: "Tạo ra nút gửi dữ liệu",
      D: "Chèn ảnh nền cho biểu mẫu",
    },
    correct: "B",
  },
  {
    id: 54,
    text: "Loại dữ liệu (type) nào của thẻ input tạo ra nút để tải tệp từ máy tính lên máy chủ?",
    options: {
      A: "type='text'",
      B: "type='password'",
      C: "type='submit'",
      D: "type='file'",
    },
    correct: "D",
  },
  {
    id: 55,
    text: "Tại sao Google Sites lại phù hợp cho học sinh thực hiện các dự án nhóm?",
    options: {
      A: "Vì nó yêu cầu phải biết lập trình nâng cao mới dùng được",
      B: "Vì nó là công cụ miễn phí, trực quan, dễ kết nối với hệ sinh thái Google (Drive, Docs) và cho phép làm việc nhóm",
      C: "Vì nó có thể hoạt động mà không cần mạng Internet",
      D: "Vì nó tự động viết nội dung bài tập cho học sinh",
    },
    correct: "B",
  },
  {
    id: 56,
    text: "Băng chuyền hình ảnh (Image Carousel) trong Google Sites dùng để làm gì?",
    options: {
      A: "Hiển thị nhiều hình ảnh luân phiên trượt qua lại trong một khung",
      B: "Cắt ghép, chỉnh sửa hình ảnh",
      C: "Biến hình ảnh thành văn bản",
      D: "Xóa ảnh khỏi Google Drive",
    },
    correct: "A",
  },
  {
    id: 57,
    text: "Nút 'Hủy bỏ' (Undo) và 'Làm lại' (Redo) trong Google Sites rất hữu ích khi nào?",
    options: {
      A: "Khi cần dịch trang web sang ngôn ngữ khác",
      B: "Khi muốn chia sẻ liên kết web cho bạn bè",
      C: "Khi lỡ thực hiện sai một thao tác (ví dụ xóa nhầm khối nội dung) và muốn quay lại trạng thái trước đó",
      D: "Khi cần in trang web ra giấy",
    },
    correct: "C",
  },
  {
    id: 58,
    text: "Đâu là hành động đầu tiên cần làm để chèn video Youtube vào Google Sites?",
    options: {
      A: "Tải video Youtube về máy tính rồi dùng phần mềm dựng phim cắt ghép",
      B: "Chọn 'Youtube' trong nhóm lệnh 'Các đối tượng khác' ở bảng chọn Chèn",
      C: "Viết mã HTML phức tạp",
      D: "Đăng ký gói cước trả phí của Youtube",
    },
    correct: "B",
  },
  {
    id: 59,
    text: "Một thiết kế mĩ thuật trang web đạt yêu cầu cần đảm bảo điều gì?",
    options: {
      A: "Sử dụng trên 10 màu sắc sặc sỡ để thu hút",
      B: "Dùng phông chữ phức tạp, uốn lượn cho bài viết dài",
      C: "Sử dụng nhất quán, hài hòa về phông chữ, cỡ chữ, bảng màu tương phản vừa phải",
      D: "Toàn bộ chữ đều được bôi đậm và in nghiêng",
    },
    correct: "C",
  },
  {
    id: 60,
    text: "Nếu muốn thu thập thông tin người dùng qua một 'Danh sách thả xuống', ta dùng thẻ HTML nào trong biểu mẫu?",
    options: {
      A: "<textarea>",
      B: "<input type='button'>",
      C: "<select> và <option>",
      D: "<label>",
    },
    correct: "C",
  },
];

const tfDataOriginal = [
  {
    id: 1,
    text: "Nhóm thiết kế web của lớp 12A đang áp dụng nhiều quy tắc CSS cho cùng một tiêu đề <h1>. Để quyết định mẫu định dạng nào được hiển thị, trình duyệt phải dựa vào quy tắc mức độ ưu tiên và trọng số của bộ chọn.",
    statements: {
      a: "Trình duyệt luôn ưu tiên tính kế thừa của HTML cao hơn trọng số của các bộ chọn CSS.",
      b: "Trọng số CSS được tính bằng cách cộng gộp tổng giá trị của các bộ chọn thành phần (ID, Class, phần tử...).",
      c: "Bộ chọn Lớp giả (pseudo-class) đóng góp giá trị trọng số là 10.",
      d: "Kí tự * (phần tử bất kỳ) có mức độ ưu tiên cao nhất, vượt qua cả từ khoá !important.",
    },
    correct: { a: "False", b: "True", c: "True", d: "False" },
  },
  {
    id: 2,
    text: "Khi lắp đặt hệ thống mạng cho phòng máy trường học, kỹ thuật viên đang phân vân giữa việc sử dụng Hub, Switch và Router để kết nối các máy tính và truyền dữ liệu ra Internet một cách bảo mật, hiệu quả.",
    statements: {
      a: "Nên sử dụng Hub thay cho Switch để giảm thiểu tình trạng xung đột tín hiệu trong mạng nhiều máy tính.",
      b: "Switch hoạt động bằng cách thiết lập kênh truyền tạm thời giữa hai cổng (máy gửi và máy nhận) để truyền dữ liệu.",
      c: "Router có nhiệm vụ tìm đường (định tuyến) giúp truyền các gói dữ liệu từ mạng LAN này sang mạng LAN khác qua Internet.",
      d: "Modem là thiết bị chỉ dùng để mở rộng sóng không dây, không làm thay đổi hay chuyển đổi tín hiệu số và tương tự.",
    },
    correct: { a: "False", b: "True", c: "True", d: "False" },
  },
  {
    id: 3,
    text: "Một nhóm học sinh đang họp bàn ý tưởng xây dựng trang web giới thiệu 'Đặc sản quê hương'. Các bạn đang ở bước thiết kế mĩ thuật và lên khung bố cục tổng thể nhằm tạo sự thu hút với du khách.",
    statements: {
      a: "Bước đầu tiên khi làm web là phải lập tức mở phần mềm lập trình để gõ mã nguồn trang chủ.",
      b: "Trang web tiêu chuẩn thường được thiết kế với cấu trúc 3 phần rõ rệt: Phần đầu trang, Phần thân trang và Phần chân trang.",
      c: "Để người đọc dễ nhìn trên màn hình, nhóm nên chọn phông chữ có chân (Serif) cho toàn bộ các văn bản dài.",
      d: "Bảng màu trang web nên có sự phối hợp hài hoà giữa các gam màu ấm, lạnh hoặc trung tính, tránh tương phản quá gắt gây chói mắt.",
    },
    correct: { a: "False", b: "True", c: "False", d: "True" },
  },
  {
    id: 4,
    text: "An sử dụng Google Sites để làm web. Tại phần đầu trang (Header), An muốn tải lên logo của câu lạc bộ, thay đổi ảnh nền thành một bức ảnh phong cảnh lớn và tuỳ chỉnh để chữ trên ảnh nền dễ đọc hơn.",
    statements: {
      a: "Favicon là một hình ảnh lớn chiếm toàn bộ kích thước của màn hình đầu trang.",
      b: "Google Sites cho phép người dùng nháy chuột vào biểu tượng 'Tải lên' để chọn hình ảnh từ máy tính làm ảnh nền phần đầu trang.",
      c: "Loại tiêu đề 'Chỉ có tiêu đề' là loại tiêu đề có kích thước lớn nhất, phủ toàn bộ màn hình.",
      d: "Có thể bật/tắt chế độ 'Tự động điều chỉnh độ sáng ảnh' bằng nút biểu tượng ở góc dưới bên phải phần đầu trang.",
    },
    correct: { a: "False", b: "True", c: "False", d: "True" },
  },
  {
    id: 5,
    text: "Khi xây dựng phần thân (Body) của trang web về Du lịch, Minh muốn chèn văn bản, bản đồ đường đi của Google Maps và một số hình ảnh để bài viết thêm trực quan, sinh động.",
    statements: {
      a: "Để tiết kiệm thời gian căn chỉnh, Minh có thể sử dụng các 'Thành phần nội dung' (Bố cục mẫu có sẵn) trong bảng chọn Chèn.",
      b: "Google Sites yêu cầu người dùng phải tự viết mã HTML thì mới có thể nhúng được bản đồ Google Maps vào trang web.",
      c: "Sau khi chèn bản đồ hoặc hình ảnh, người dùng hoàn toàn có thể kéo thả để di chuyển hoặc thay đổi kích thước của chúng.",
      d: "Chân trang (Footer) là khu vực chỉ chứa mã lệnh hệ thống, không cho phép chèn liên kết đến mạng xã hội hay thông tin liên hệ.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 6,
    text: "Trang chủ giới thiệu về 'Tây Bắc' của nhóm đang trở nên quá dài và lộn xộn. Nhóm quyết định phân loại nội dung bằng cách tạo ra các trang con riêng biệt như 'Mù Cang Chải' và đặt liên kết tại trang chủ.",
    statements: {
      a: "Trang con là những trang web độc lập nhưng được tổ chức nằm dưới và mở ra từ bảng chọn của trang chủ.",
      b: "Google Sites không cho phép tạo trang con của một trang con khác (tức là không hỗ trợ cấu trúc cây sâu hơn 2 cấp).",
      c: "Nhóm có thể bôi đen chữ 'Đọc tiếp' ở cuối bài tóm tắt trên trang chủ, sau đó chọn lệnh 'Chèn đường liên kết' trỏ tới trang Mù Cang Chải.",
      d: "Thanh điều hướng chứa các liên kết trang web luôn luôn hiển thị dàn hàng ngang trên mọi thiết bị, kể cả điện thoại di động.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 7,
    text: "Câu lạc bộ Tin học trường muốn tạo một bảng khảo sát (Form) thu thập ý kiến người xem về giao diện website mới. Họ quyết định làm Form và nhúng trực tiếp vào trang 'Liên hệ'.",
    statements: {
      a: "Bắt buộc phải mua phần mềm trả phí từ bên thứ ba mới có thể tạo biểu mẫu nhập dữ liệu chuyên nghiệp trên website.",
      b: "Quản trị viên có thể sử dụng công cụ Google Forms để tạo bảng câu hỏi, sau đó dùng lệnh Chèn → Biểu mẫu để nhúng vào Google Sites.",
      c: "Khi người dùng gửi phản hồi, dữ liệu có thể được hệ thống tự động vẽ thành biểu đồ tóm tắt hoặc xuất ra tệp Bảng tính (Google Sheets).",
      d: "Nếu quản trị viên cập nhật hoặc thêm câu hỏi mới trên Google Forms, họ phải xóa biểu mẫu cũ trên Google Sites và nhúng lại từ đầu.",
    },
    correct: { a: "False", b: "True", c: "True", d: "False" },
  },
  {
    id: 8,
    text: "Trong quá trình lập trình HTML cho trang đăng ký thành viên, học sinh phải dùng các thẻ <form> và <input> để tạo ô điền Tên, nút chọn Giới tính (chỉ 1 lựa chọn) và nút Gửi đi.",
    statements: {
      a: "Thẻ <input type='text'> giúp tạo ra một trường dữ liệu dạng hộp văn bản để người dùng gõ Họ và tên.",
      b: "Để tạo lựa chọn giới tính (chỉ cho phép chọn 1 trong 2: Nam hoặc Nữ), lập trình viên phải dùng <input type='checkbox'>.",
      c: "Nút xác nhận gửi toàn bộ thông tin về máy chủ được tạo bởi mã lệnh <input type='submit'>.",
      d: "Thuộc tính name bên trong thẻ input chỉ dùng để đổi màu ô chữ, không có chức năng tham chiếu dữ liệu để hệ thống xử lý.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 9,
    text: "Đang hoàn thiện bước cuối cùng của dự án website, Lan muốn điều chỉnh toàn bộ màu sắc, phông chữ một cách đồng bộ và đổi thanh Menu sang dạng trải dài theo chiều ngang ở trên cùng.",
    statements: {
      a: "Để thanh Menu (điều hướng) hiển thị ngang ở trên cùng, các trang web phải được tạo cùng cấp với Trang chủ và thiết lập chế độ hiển thị 'Trên cùng'.",
      b: "Khi áp dụng Mẫu giao diện (Themes) có sẵn của Google Sites, người dùng sẽ bị khóa vĩnh viễn, không thể đổi màu sắc hay phông chữ được nữa.",
      c: "Tính năng bảng chọn Giao diện (Themes) hỗ trợ thay đổi nhanh chóng, đồng nhất màu nền, kiểu chữ toàn trang thông qua bảng 'sắc thái màu'.",
      d: "Trong bảng chọn 'Trang', người dùng không thể kéo thả để thay đổi trật tự hiển thị trên, dưới của các trang web.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 10,
    text: "Để tạo giao diện web gồm phần Banner và Slogan được chia thành 3 cột đều nhau, bạn lập trình viên quyết định dùng thẻ <div> kết hợp với các lớp CSS (class) như .row và .block_3.",
    statements: {
      a: "Để chèn hình nền kích thước lớn vào vùng Banner, người lập trình có thể sử dụng thuộc tính background: url(...) trong CSS.",
      b: "Các thẻ <div> theo mặc định sẽ luôn luôn sắp xếp các phần tử nội dung nằm ngang cạnh nhau.",
      c: "Lớp CSS .block_3 với thuộc tính width: 33.33% khi đặt trong thẻ cha linh hoạt (Flexbox) sẽ giúp chia Slogan thành 3 cột bằng nhau.",
      d: "Khi định dạng 3 cột có thiết kế hình thức giống hệt nhau, bắt buộc phải tạo 3 lớp CSS với 3 tên gọi khác biệt hoàn toàn (vd: block1, block2, block3).",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 11,
    text: "Do máy chủ dữ liệu bị xâm nhập và hệ thống mạng liên tục gặp sự cố nghẽn cổ chai, một công quy thương mại điện tử buộc phải tuyển dụng khẩn cấp các chuyên gia về Quản trị CNTT.",
    statements: {
      a: "Nhiệm vụ cốt lõi của Chuyên gia bảo mật hệ thống thông tin trong công ty là thiết kế và chỉnh sửa video quảng cáo sản phẩm.",
      b: "Việc cài đặt thiết bị, xử lý sự cố đứt kết nối mạng và đảm bảo tín hiệu hoạt động ổn định thuộc thẩm quyền của Chuyên gia quản trị mạng.",
      c: "Người làm công việc quản trị CNTT chỉ làm việc với máy móc nên hoàn toàn không cần tìm hiểu về luật pháp hay quy định bảo mật dữ liệu của nhà nước.",
      d: "Khả năng tự học hỏi, cập nhật công nghệ và xu hướng tấn công mới là kỹ năng mềm cực kỳ cần thiết để sinh tồn trong nghề này.",
    },
    correct: { a: "False", b: "True", c: "False", d: "True" },
  },
  {
    id: 12,
    text: "Nhóm học sinh dự định làm một trang web Portfolio (hồ sơ năng lực) cá nhân bằng Google Sites. Trong đó bao gồm video thuyết trình nhúng từ Youtube và xuất bản chia sẻ công khai.",
    statements: {
      a: "Bảng chọn 'Chèn' trên Google Sites cung cấp sẵn tùy chọn 'Youtube', cho phép người dùng tìm và nhúng trực tiếp video vào trang.",
      b: "Tính năng 'Chân trang' (Footer) chỉ có thể thiết lập hiển thị độc quyền tại Trang chủ, các Trang con phải tạo chân trang riêng thủ công.",
      c: "Nút 'Công bố' (Publish) sẽ tạo ra một đường dẫn (URL) chính thức, giúp bất kỳ ai có link đều có thể xem trang web trên Internet.",
      d: "Học sinh bắt buộc phải trả phí duy trì hàng tháng để các trang web tạo bằng Google Sites không bị xóa khỏi máy chủ Google.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
];

const essayDataOriginal = [
  {
    id: 1,
    text: "Hãy phân tích sự khác biệt về mặt bản chất giữa pseudo-class (lớp giả) và pseudo-element (phần tử giả) trong CSS. Đặt vào tình huống em đang thiết kế menu cho một website, nếu không sử dụng pseudo-class :hover, trải nghiệm của người dùng (UX) khi tương tác với trang web sẽ gặp hạn chế gì?",
    hint: "Gợi ý: Pseudo-class (:hover, :active) chọn phần tử dựa trên trạng thái tương tác của người dùng. Pseudo-element (::before, ::first-line) tạo ra hoặc chọn một phần cụ thể của phần tử. Nếu không có :hover, người dùng sẽ không thấy hiệu ứng phản hồi khi đưa chuột vào menu, làm giảm tính tương tác và trực quan.",
  },
  {
    id: 2,
    text: "Giả sử em đang thiết lập hệ thống nhà thông minh (Smart Home) cho gia đình với các thiết bị như bóng đèn, rèm cửa tự động. Hãy giải thích tại sao ở lần thiết lập đầu tiên, điện thoại của em và thiết bị thông minh bắt buộc phải ở gần nhau để kết nối qua sóng cục bộ (Bluetooth/Wi-Fi trực tiếp), nhưng sau đó em lại có thể dễ dàng điều khiển tắt mở bóng đèn khi đang ở một thành phố khác qua mạng Internet?",
    hint: "Gợi ý: Lúc đầu cần sóng cục bộ để trao đổi thông tin xác thực (mật khẩu Wi-Fi nhà). Sau khi thiết bị kết nối được với Router ở nhà, nó sẽ liên lạc với Server đám mây (Cloud). Điện thoại ở xa kết nối qua Internet vào Server này để gửi lệnh điều khiển về thiết bị.",
  },
  {
    id: 3,
    text: "'Thiết kế mĩ thuật của trang web không chỉ là làm cho nó đẹp, mà còn phải phù hợp với tâm lý người đọc'. Giả sử em đang làm một trang web về chủ đề 'Lịch sử Việt Nam hào hùng'. Em sẽ lựa chọn bảng màu (ấm/lạnh/trung tính) và phông chữ (có chân - Serif hay không chân - Sans Serif) như thế nào cho tiêu đề và phần nội dung bài viết dài để tạo cảm giác trang trọng nhưng vẫn đảm bảo mắt người đọc không bị mỏi? Lập luận sự lựa chọn của em.",
    hint: "Gợi ý: Màu sắc nên dùng gam màu ấm (đỏ đô, vàng đồng) kết hợp trung tính để tạo sự trang trọng, hào hùng. Phông chữ: Tiêu đề có thể dùng Serif (có chân) để tạo sự cổ điển, uy nghiêm; Phần nội dung văn bản dài nên dùng Sans Serif (không chân) để mắt dễ đọc, không bị rối trên màn hình.",
  },
  {
    id: 4,
    text: "Khi sử dụng Google Sites, thay vì tạo một trang web duy nhất kéo dài vô tận chứa toàn bộ các bài viết, các chuyên gia khuyên nên phân tách thành một Trang chủ và nhiều Trang con (Cấu trúc hình cây). Dưới góc độ quản lý thông tin và sự tiện lợi cho người truy cập, em hãy phân tích tính ưu việt của việc tổ chức cấu trúc theo dạng hình cây này.",
    hint: "Gợi ý: Về quản lý: Dễ dàng phân chia danh mục, tìm kiếm và cập nhật nội dung. Về người dùng: Tránh quá tải thông tin ở trang chủ, bố cục rõ ràng, điều hướng nhanh chóng bằng Menu, tăng trải nghiệm (UX).",
  },
  {
    id: 5,
    text: "Trong quá trình xây dựng phần thân trang web về du lịch bằng Google Sites, việc nhúng (embed) trực tiếp các ứng dụng mở như bản đồ Google Maps mang lại lợi thế vượt trội nào về mặt tương tác cho người xem so với việc em chỉ chụp ảnh màn hình (screenshot) bản đồ đó rồi chèn dưới dạng một bức ảnh tĩnh .jpg?",
    hint: "Gợi ý: Nhúng (Embed) cho phép người dùng tương tác trực tiếp: Phóng to/thu nhỏ (Zoom), xem chế độ vệ tinh, tìm đường đi ngay trên trang web mà không cần chuyển ứng dụng, cung cấp dữ liệu luôn được cập nhật theo thời gian thực.",
  },
  {
    id: 6,
    text: "Em được giáo viên giao nhiệm vụ viết mã HTML tạo một Form đăng ký tham gia câu lạc bộ. Em hãy đề xuất các thuộc tính type của thẻ <input> phù hợp nhất cho các trường thông tin sau và giải thích ngắn gọn lý do: 'Họ và tên'; 'Mật khẩu đăng nhập'; 'Kỹ năng đang có (có thể chọn nhiều: Hát, Múa, Vẽ...)'; 'Giới tính (chỉ chọn 1: Nam/Nữ)'.",
    hint: "Gợi ý: Họ tên -> type='text' (nhập chữ thường). Mật khẩu -> type='password' (che kí tự bảo mật). Kỹ năng -> type='checkbox' (cho phép chọn nhiều). Giới tính -> type='radio' (chỉ cho phép chọn 1 giá trị duy nhất trong nhóm).",
  },
  {
    id: 7,
    text: "Sau khi nhúng Google Forms vào Google Sites để làm biểu mẫu 'Thu thập ý kiến đóng góp của học sinh về thư viện trường', dữ liệu người dùng nhập vào sẽ được lưu trữ và thống kê ở đâu? Là người quản trị trang web, làm thế nào em có thể sử dụng các kết quả thống kê này một cách khoa học để đưa ra quyết định thay đổi nội dung trang web cho phù hợp hơn?",
    hint: "Gợi ý: Dữ liệu lưu tại phần Câu trả lời (Responses) của Google Forms hoặc tệp Google Sheets liên kết. Người quản trị xem biểu đồ thống kê để biết tính năng nào học sinh thích/không thích, từ đó điều chỉnh bố cục, bổ sung tài liệu mà học sinh đang thực sự cần.",
  },
  {
    id: 8,
    text: "Trong bước thiết lập Giao diện (Themes) của Google Sites, hệ thống chỉ cho phép người dùng chọn một số mẫu phông chữ nhất định và cung cấp bảng 3 kiểu màu cơ bản để thay đổi toàn trang. Theo em, sự 'hạn chế tùy biến' này mang lại lợi ích gì cho những học sinh không chuyên về thiết kế mĩ thuật khi xây dựng website dự án?",
    hint: "Gợi ý: Giúp học sinh không bị rối, tránh việc lạm dụng quá nhiều màu sắc hay phông chữ gây mất thẩm mỹ (lỗi lòe loẹt). Đảm bảo tính nhất quán (Consistency) và chuẩn mực thiết kế UI/UX ngay từ đầu một cách tự động.",
  },
  {
    id: 9,
    text: "Việc nhấp nút 'Công bố' (Publish) một website ra công chúng sẽ đi kèm với các rủi ro pháp lý về bản quyền (hình ảnh, âm thanh) và bảo mật thông tin cá nhân. Nếu được đóng vai trò là một 'Chuyên gia bảo mật hệ thống thông tin', em sẽ đưa ra 3 khuyến cáo gì cho các bạn trong lớp trước khi đưa website bài tập môn Tin học của mình lên Internet?",
    hint: "Gợi ý: 1. Chỉ dùng hình ảnh/âm thanh miễn phí bản quyền (Free license) hoặc tự chụp. 2. Không đưa thông tin cá nhân nhạy cảm (SĐT, địa chỉ nhà riêng, CCCD) lên web. 3. Ghi rõ nguồn trích dẫn nếu lấy tài liệu từ nơi khác.",
  },
  {
    id: 10,
    text: "Nếu được nhà trường cấp quyền sử dụng công cụ Google Sites để tự do sáng tạo, em sẽ xây dựng một dự án website gì nhằm giải quyết một vấn đề bức xúc (hoặc đáp ứng một nhu cầu thiết thực) trong cộng đồng học sinh trường em hiện nay? Trình bày ngắn gọn: (1) Tên ý tưởng (2) Mục đích & Đối tượng mục tiêu (3) Bố cục các trang con chính mà em sẽ triển khai trên thanh điều hướng.",
    hint: "Gợi ý mở: HS tự do sáng tạo. VD: Tên ý tưởng 'Chợ sách cũ Na Rì'. Mục đích: Giúp HS trao đổi, mua bán sách cũ giá rẻ. Bố cục: Trang chủ -> Sách giáo khoa -> Sách tham khảo -> Truyện tranh -> Liên hệ ký gửi.",
  },
];

// --- HÀM TẠO BỘ DỮ LIỆU NGẪU NHIÊN ---
const generateShuffledData = () => {
  // 1. Đảo danh sách câu MCQ và đảo luôn các đáp án A, B, C, D
  const shuffledMcq = shuffleArray(mcqDataOriginal).map((q) => {
    const correctValue = q.options[q.correct];
    const values = Object.values(q.options);
    const shuffledValues = shuffleArray(values);

    const newOptions = {};
    let newCorrect = "";
    const labels = ["A", "B", "C", "D"];

    shuffledValues.forEach((val, index) => {
      newOptions[labels[index]] = val;
      if (val === correctValue) {
        newCorrect = labels[index];
      }
    });
    return { ...q, options: newOptions, correct: newCorrect };
  }); // 2. Đảo danh sách câu Đúng/Sai và ĐẢO LUÔN CÁC Ý a, b, c, d bên trong

  const shuffledTf = shuffleArray(tfDataOriginal).map((q) => {
    const statementEntries = Object.entries(q.statements);
    const shuffledEntries = shuffleArray(statementEntries);

    const newStatements = {};
    const newCorrect = {};
    const labels = ["a", "b", "c", "d"];

    shuffledEntries.forEach(([oldKey, statementText], index) => {
      const newLabel = labels[index];
      newStatements[newLabel] = statementText;
      newCorrect[newLabel] = q.correct[oldKey];
    });

    return { ...q, statements: newStatements, correct: newCorrect };
  }); // 3. Đảo ngẫu nhiên vị trí các câu tự luận

  const shuffledEssay = shuffleArray(essayDataOriginal);

  return { mcq: shuffledMcq, tf: shuffledTf, essay: shuffledEssay };
};

export default function App() {
  const [studentInfo, setStudentInfo] = useState({ name: "", class: "" });
  const [activeTab, setActiveTab] = useState("mcq");
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [scores, setScores] = useState({ mcq: 0, tf: 0, total: 0 }); // Dữ liệu câu hỏi đã được đảo

  const [quizData, setQuizData] = useState(() => generateShuffledData()); // Trạng thái đáp án

  const [mcqAnswers, setMcqAnswers] = useState({});
  const [tfAnswers, setTfAnswers] = useState({});
  const [essayAnswers, setEssayAnswers] = useState({}); // Logic Đồng Hồ: Tự động đếm ngược & ÉP NỘP khi hết giờ

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleForceSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleMcqChange = (qId, option) => {
    if (isSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleTfChange = (qId, statementKey, value) => {
    if (isSubmitted) return;
    setTfAnswers((prev) => ({
      ...prev,
      [qId]: { ...(prev[qId] || {}), [statementKey]: value },
    }));
  };

  const handleEssayChange = (qId, text) => {
    if (isSubmitted) return;
    setEssayAnswers((prev) => ({ ...prev, [qId]: text }));
  }; // Tính điểm dựa trên dữ liệu quizData đã đảo

  const calculateScore = () => {
    let mcqScore = 0;
    quizData.mcq.forEach((q) => {
      if (mcqAnswers[q.id] === q.correct) {
        mcqScore += 0.25;
      }
    });

    let tfScore = 0;
    quizData.tf.forEach((q) => {
      const userAns = tfAnswers[q.id] || {};
      let correctCount = 0;
      ["a", "b", "c", "d"].forEach((key) => {
        if (userAns[key] === q.correct[key]) correctCount++;
      });

      if (correctCount === 1) tfScore += 0.1;
      else if (correctCount === 2) tfScore += 0.25;
      else if (correctCount === 3) tfScore += 0.5;
      else if (correctCount === 4) tfScore += 1.0;
    });

    const totalScore = mcqScore + tfScore;
    setScores({ mcq: mcqScore, tf: tfScore, total: totalScore });
    return { mcq: mcqScore, tf: tfScore, total: totalScore };
  }; // Nộp bài thủ công có kiểm tra tên/lớp

  const handleSubmit = () => {
    if (!studentInfo.name.trim() || !studentInfo.class.trim()) {
      setShowConfirmModal("info_missing");
      return;
    }
    setShowConfirmModal("confirm");
  }; // Ép nộp bài khi hết giờ (gán tên mặc định nếu trống)

  const handleForceSubmit = () => {
    let finalName = studentInfo.name.trim() || "Không ghi tên (Hết giờ)";
    let finalClass = studentInfo.class.trim() || "Không rõ";
    setStudentInfo({ name: finalName, class: finalClass });
    executeSubmit(finalName, finalClass);
  };

  const confirmSubmit = () => {
    executeSubmit(studentInfo.name, studentInfo.class);
  }; // Hàm xử lý nộp bài lõi

  const executeSubmit = (submitName, submitClass) => {
    const currentScores = calculateScore();

    setShowConfirmModal(false);
    setIsSubmitted(true);
    setActiveTab("mcq");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const resultData = {
      name: submitName,
      class: submitClass,
      mcqScore: currentScores.mcq,
      tfScore: currentScores.tf,
      totalScore: currentScores.total,
      essayAnswers: essayAnswers,
    }; // Tạm thời chỉ chấm điểm và hiển thị trên màn hình
    // Đã gỡ bỏ toàn bộ kết nối gửi dữ liệu đi (Ubuntu / Google Sheets)

    console.log("Học sinh nộp bài:", resultData);
  }; // Hàm Làm Lại Bài

  const handleReset = () => {
    if (
      window.confirm(
        "Em có chắc chắn muốn xóa hết kết quả và làm lại từ đầu không?",
      )
    ) {
      setIsSubmitted(false);
      setMcqAnswers({});
      setTfAnswers({});
      setEssayAnswers({});
      setScores({ mcq: 0, tf: 0, total: 0 });
      setTimeLeft(45 * 60);
      setQuizData(generateShuffledData());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12">
            {/* Banner */}     {" "}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white py-12 px-4 shadow-inner relative overflow-hidden">
               {" "}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
               {" "}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
               {" "}
        <div className="max-w-5xl mx-auto text-center relative z-10">
                   {" "}
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">
                        ÔN TẬP CUỐI KÌ 2 TIN HỌC 12          {" "}
          </h1>
                   {" "}
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-4"></div>
                   {" "}
          <p className="text-xl md:text-2xl font-bold text-blue-100 uppercase tracking-widest">
                        TRƯỜNG THPT NA RÌ          {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
            {/* Header Sticky */}     {" "}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
               {" "}
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                   {" "}
          <div className="flex-1 w-full flex flex-col md:flex-row gap-3 items-center">
                        {/* Input Tên */}           {" "}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                            <User className="text-blue-600 w-5 h-5" />         
                 {" "}
              <input
                type="text"
                placeholder="Họ và Tên"
                disabled={isSubmitted}
                className="bg-transparent border-none outline-none text-sm font-semibold w-full md:w-48 disabled:text-gray-500"
                value={studentInfo.name}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, name: e.target.value })
                }
              />
                         {" "}
            </div>
                        {/* Input Lớp */}           {" "}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                            <BookOpen className="text-blue-600 w-5 h-5" />     
                     {" "}
              <input
                type="text"
                placeholder="Lớp"
                disabled={isSubmitted}
                className="bg-transparent border-none outline-none text-sm font-semibold w-full md:w-24 disabled:text-gray-500"
                value={studentInfo.class}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, class: e.target.value })
                }
              />
                         {" "}
            </div>
                        {/* Tools */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap md:flex-nowrap">
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2.5 rounded-lg font-mono font-bold border border-amber-200 shadow-sm whitespace-nowrap flex-shrink-0">
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transform transition-all active:scale-95 disabled:opacity-50 disabled:grayscale whitespace-nowrap flex-shrink-0"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Kết thúc bài làm</span>
              </button>

              {isSubmitted && (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all shadow-md font-bold whitespace-nowrap flex-shrink-0"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Làm lại bài</span>
                </button>
              )}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </header>
           {" "}
      <main className="max-w-5xl mx-auto px-4 mt-6">
                {/* Results Banner */}       {" "}
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 shadow-sm text-center">
                       {" "}
            <h2 className="text-2xl font-bold text-green-800 mb-2">
                            Đã nộp bài!            {" "}
            </h2>
                       {" "}
            <p className="text-green-700 mb-4">
                            Học sinh:{" "}
              <span className="font-bold">{studentInfo.name}</span> -          
                  Lớp: <span className="font-bold">{studentInfo.class}</span>   
                     {" "}
            </p>
                       {" "}
            <div className="flex flex-wrap justify-center gap-6">
                           {" "}
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
                               {" "}
                <p className="text-sm text-gray-500 font-medium">Trắc nghiệm</p>
                               {" "}
                <p className="text-xl font-bold text-blue-600">
                                    {scores.mcq.toFixed(2)} điểm              
                   {" "}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
                               {" "}
                <p className="text-sm text-gray-500 font-medium">Đúng / Sai</p> 
                             {" "}
                <p className="text-xl font-bold text-blue-600">
                                    {scores.tf.toFixed(2)} điểm              
                   {" "}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
                               {" "}
                <p className="text-sm text-gray-500 font-medium">
                                    Tổng Trắc Nghiệm                {" "}
                </p>
                               {" "}
                <p className="text-2xl font-bold text-green-600">
                                    {scores.total.toFixed(2)} điểm              
                   {" "}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <p className="text-sm text-gray-500 mt-4 italic">
                            * Điểm tự luận sẽ được giáo viên chấm sau.          
               {" "}
            </p>
                     {" "}
          </div>
        )}
                {/* Tabs */}       {" "}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                   {" "}
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === "mcq" ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("mcq")}
          >
                        Trắc nghiệm khách quan          {" "}
          </button>
                   {" "}
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === "tf" ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("tf")}
          >
                        Trắc nghiệm đúng/sai          {" "}
          </button>
                   {" "}
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === "essay" ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("essay")}
          >
                        Tự luận          {" "}
          </button>
                 {" "}
        </div>
                {/* Tab Content: MCQ */}       {" "}
        {activeTab === "mcq" && (
          <div className="space-y-6">
                       {" "}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6">
                            <strong>Hướng dẫn:</strong> Mỗi câu trả lời đúng
              được tính 0.25               điểm. Chọn 1 đáp án đúng nhất. Cấu
              trúc câu hỏi và đáp án đã được               đảo ngẫu nhiên.      
                   {" "}
            </div>
                       {" "}
            {quizData.mcq.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                                {/* Thay thế thẻ h3 cũ bằng đoạn này */}
                <h3 className="font-semibold text-base md:text-lg mb-4 flex flex-col md:flex-row gap-1 md:gap-2">
                  <span className="text-blue-600 whitespace-nowrap">
                    Câu {index + 1}:
                  </span>
                  <span className="text-gray-800 leading-relaxed">
                    {q.text}
                  </span>
                </h3>
                               {" "}
                <div className="space-y-3 pl-4">
                                   {" "}
                  {Object.entries(q.options).map(([key, val]) => {
                    const isSelected = mcqAnswers[q.id] === key;
                    const isCorrect = q.correct === key;
                    let optionClass =
                      "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ";
                    if (!isSubmitted) {
                      optionClass += isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
                    } else {
                      if (isCorrect)
                        optionClass += "border-green-500 bg-green-50";
                      else if (isSelected && !isCorrect)
                        optionClass += "border-red-500 bg-red-50";
                      else optionClass += "border-gray-200 opacity-60";
                    }
                    return (
                      <label key={key} className={optionClass}>
                                               {" "}
                        <input
                          type="radio"
                          name={`mcq-${q.id}`}
                          value={key}
                          checked={isSelected}
                          onChange={() => handleMcqChange(q.id, key)}
                          disabled={isSubmitted}
                          className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                                               {" "}
                        <span className="font-medium flex-1">
                                                   {" "}
                          <span className="font-bold mr-2">{key}.</span>       
                                            {val}                       {" "}
                        </span>
                                               {" "}
                        {isSubmitted && isCorrect && (
                          <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                        )}
                                               {" "}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                        )}
                                             {" "}
                      </label>
                    );
                  })}
                                 {" "}
                </div>
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
        )}
                {/* Tab Content: True/False */}       {" "}
        {activeTab === "tf" && (
          <div className="space-y-8">
                       {" "}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6">
                            <strong>Hướng dẫn:</strong> Mỗi câu có 4 ý (a, b, c,
              d). Điểm từng               câu tính theo số ý trả lời đúng: 1 ý
              đúng = 0.1đ; 2 ý đúng =               0.25đ; 3 ý đúng = 0.5đ; 4 ý
              đúng = 1.0đ.            {" "}
            </div>
                       {" "}
            {quizData.tf.map((q, index) => {
              const userAns = tfAnswers[q.id] || {};
              let correctCount = 0;
              let qPoints = 0;
              if (isSubmitted) {
                ["a", "b", "c", "d"].forEach((key) => {
                  if (userAns[key] === q.correct[key]) correctCount++;
                });
                if (correctCount === 1) qPoints = 0.1;
                else if (correctCount === 2) qPoints = 0.25;
                else if (correctCount === 3) qPoints = 0.5;
                else if (correctCount === 4) qPoints = 1.0;
              }
              return (
                <div
                  key={q.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                                   {" "}
                  <div className="flex justify-between items-start mb-4 gap-4">
                                       {" "}
                    <h3 className="font-semibold text-base md:text-lg flex flex-col md:flex-row gap-1 md:gap-2 w-full">
                      <span className="text-blue-600 whitespace-nowrap">
                        Câu {index + 1}:
                      </span>
                      <span className="text-gray-800 flex-1">{q.text}</span>
                    </h3>
                                       {" "}
                    {isSubmitted && (
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">
                                                {qPoints.toFixed(2)} điểm (
                        {correctCount}/4)                      {" "}
                      </div>
                    )}
                                     {" "}
                  </div>
                                   {" "}
                  <div className="space-y-4 pl-4 mt-6">
                                       {" "}
                    {Object.entries(q.statements).map(([key, statement]) => {
                      const ans = userAns[key];
                      const isCorrect = q.correct[key];
                      let rowClass =
                        "flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-lg border ";
                      if (!isSubmitted) {
                        rowClass += ans
                          ? "border-blue-200 bg-blue-50/30"
                          : "border-gray-100 bg-gray-50/50";
                      } else {
                        if (ans === isCorrect)
                          rowClass += "border-green-500 bg-green-50";
                        else if (ans && ans !== isCorrect)
                          rowClass += "border-red-500 bg-red-50";
                        else rowClass += "border-red-500 bg-red-50";
                      }
                      return (
                        <div key={key} className={rowClass}>
                                                   {" "}
                          <div className="flex-1 font-medium flex gap-2">
                                                       {" "}
                            <span className="font-bold">{key})</span>           
                                            <span>{statement}</span>           
                                         {" "}
                          </div>
                                                   {" "}
                          <div className="flex gap-2 flex-shrink-0">
                                                       {" "}
                            <label
                              className={`flex items-center justify-center w-20 py-2 rounded border cursor-pointer transition-colors ${!isSubmitted ? (ans === "True" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-100") : isCorrect === "True" ? "bg-green-600 text-white border-green-600" : ans === "True" ? "bg-red-600 text-white border-red-600" : "bg-gray-100 border-gray-300 text-gray-400"}`}
                            >
                                                           {" "}
                              <input
                                type="radio"
                                name={`tf-${q.id}-${key}`}
                                className="hidden"
                                checked={ans === "True"}
                                onChange={() =>
                                  handleTfChange(q.id, key, "True")
                                }
                                disabled={isSubmitted}
                              />
                                                            Đúng                
                                         {" "}
                            </label>
                                                       {" "}
                            <label
                              className={`flex items-center justify-center w-20 py-2 rounded border cursor-pointer transition-colors ${!isSubmitted ? (ans === "False" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-100") : isCorrect === "False" ? "bg-green-600 text-white border-green-600" : ans === "False" ? "bg-red-600 text-white border-red-600" : "bg-gray-100 border-gray-300 text-gray-400"}`}
                            >
                                                           {" "}
                              <input
                                type="radio"
                                name={`tf-${q.id}-${key}`}
                                className="hidden"
                                checked={ans === "False"}
                                onChange={() =>
                                  handleTfChange(q.id, key, "False")
                                }
                                disabled={isSubmitted}
                              />
                                                            Sai                
                                         {" "}
                            </label>
                                                     {" "}
                          </div>
                                                 {" "}
                        </div>
                      );
                    })}
                                     {" "}
                  </div>
                                 {" "}
                </div>
              );
            })}
                     {" "}
          </div>
        )}
                {/* Tab Content: Essay */}       {" "}
        {activeTab === "essay" && (
          <div className="space-y-6">
                       {" "}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6 flex gap-2 items-start">
                           {" "}
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />       
                   {" "}
              <div>
                                <strong>Lưu ý:</strong> Học sinh tự gõ câu trả
                lời vào ô trống.                 Tính năng Sao chép (Copy) và
                Dán (Paste) đã bị vô hiệu hóa để                 đảm bảo tính tự
                giác.              {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            {quizData.essay.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                               {" "}
                <h3 className="font-semibold text-base md:text-lg mb-4 flex flex-col md:flex-row gap-1 md:gap-2 w-full">
                  <span className="text-blue-600 whitespace-nowrap">
                    Câu {index + 1}:
                  </span>
                  <span className="text-gray-800 flex-1">{q.text}</span>
                </h3>
                               {" "}
                <textarea
                  className={`w-full p-4 border rounded-lg resize-y focus:ring-2 outline-none transition-shadow min-h-[150px] ${isSubmitted ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                  placeholder={
                    isSubmitted
                      ? "Bài làm đã được nộp."
                      : "Nhập câu trả lời của bạn tại đây..."
                  }
                  value={essayAnswers[q.id] || ""}
                  onChange={(e) => handleEssayChange(q.id, e.target.value)}
                  disabled={isSubmitted}
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  autoComplete="off"
                  spellCheck="false"
                ></textarea>
                               {" "}
                {isSubmitted && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                       {" "}
                    <h4 className="font-bold text-yellow-800 text-sm mb-1">
                                            Gợi ý đáp án:                  
                       {" "}
                    </h4>
                                       {" "}
                    <p className="text-sm text-yellow-900 leading-relaxed">
                                            {q.hint}                   {" "}
                    </p>
                                     {" "}
                  </div>
                )}
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
        )}
             {" "}
      </main>
            {/* Modal Xác Nhận */}     {" "}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                   {" "}
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
                       {" "}
            {showConfirmModal === "info_missing" ? (
              <>
                               {" "}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mx-auto mb-4">
                                    <AlertTriangle className="w-6 h-6" />       
                         {" "}
                </div>
                               {" "}
                <h3 className="text-xl font-bold text-center mb-2">
                                    Thiếu thông tin!                {" "}
                </h3>
                               {" "}
                <p className="text-gray-600 text-center mb-6">
                                    Vui lòng điền đầy đủ Họ Tên và Lớp trước khi
                  nộp bài.                {" "}
                </p>
                               {" "}
                <div className="flex justify-center">
                                   {" "}
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
                  >
                                        Đã hiểu                  {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </>
            ) : (
              <>
                               {" "}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                                    <CheckCircle className="w-6 h-6" />         
                       {" "}
                </div>
                               {" "}
                <h3 className="text-xl font-bold text-center mb-2">
                                    Xác nhận nộp bài                {" "}
                </h3>
                               {" "}
                <p className="text-gray-600 text-center mb-6">
                                    Bạn có chắc chắn muốn kết thúc bài làm và
                  nộp bài không? Hành                   động này không thể hoàn
                  tác.                {" "}
                </p>
                               {" "}
                <div className="flex justify-center gap-3">
                                   {" "}
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold flex-1"
                  >
                                        Hủy                  {" "}
                  </button>
                                   {" "}
                  <button
                    onClick={confirmSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex-1"
                  >
                                        Nộp bài                  {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </>
            )}
                     {" "}
          </div>
                 {" "}
        </div>
      )}
         {" "}
    </div>
  );
}
