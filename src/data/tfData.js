// Ngân hàng câu hỏi Đúng/Sai (mỗi câu 4 ý a-d) - Ôn tập Tin học 12
const tfData = [
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

export default tfData;
