// Ngân hàng câu hỏi Tự luận (có gợi ý đáp án) - Ôn tập Tin học 12
const essayData = [
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

export default essayData;
