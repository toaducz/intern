# Job And Interview Management Project

## 📋 Introduction
This project is a combination of two projects: Job Management and Interview Management. We currently completed Job Management APIs and expanding to Interview Management

## 📝 Requirement (Job Management)
- Xây dựng 1 trang web tiếp nhận cv từ ứng viên và các job mà doanh nghiệp gửi lên. Phía công ty mình là admin website sẽ quản lý, duyệt các job từ công ty.
- Đầu tiên doanh nghiệp cần đăng ký thông tin của mình, admin bên mình sẽ duyệt và gửi email về cho công ty đăng ký 1 api key, từ api key này công ty sẽ có thể tạo các account của nhân viên như HR, ... 
- Doanh nghiệp sau khi đăng ký thành công có thể tạo những việc làm, tên, vị trí công việc, ngày hết hạn,...
- Bên mình là admin khi vào website có thể lấy được danh sách công việc đang tuyển, chưa duyệt, sắp hết hạn, ... tiếp nhận các yêu cầu chờ duyệt từ các công ty và duyệt job. Khi duyệt xong -> account công ty khách hiện những công việc này.
- Về phía ứng viên, khi vào website với role là guest thì có thể xem được các job đang tuyển từ các công ty, muốn apply CV hoặc coi thông tin công ty thì phải đăng ký tài khoản website. Quá trình nộp CV: ứng viên điền thông tin cá nhân vào form trước, sau đó kèm theo link CV (upload file hoặc gửi link)
- Khi này mình sẽ tiếp nhận lượng hồ sơ từ ứng viên, công ty khách bấm vào xem sẽ xem được các hồ sơ ứng tuyển đó
- Khi Nộp CV cho 1 Job thì không được nữa - Phải đợi đến khi Jobs hến hạn, đăng lại mới được nộp lại.
- Có phân role, cv, job có các trạng thái, có thông báo, lưu log vào database (không lưu GET)
- Cho ứng viên upload certificate của ứng viên

## 📝 Requirement (Interview Management)
- trang web quản lý lịch phỏng vấn cho doanh nghiệp
- các state của 1 đơn phỏng vấn: rejected, cv, state1, state2, state3, hired
    - cv: vòng loại cv, vòng này do HR quản lý các cv.
    - state1: phỏng vấn với HR => sau khi approve thì chuyển sang state2
    - state2: phỏng vấn về mặt knowledge, technical => sau khi approve thì chuyển lên state 3
    - state3: phỏng vấn về mặt môi trường công ty, cách ứng xử,... => sau khi approve thì chuyển lên state hired
    - hired: đã được nhận
- Company Owner: được phép xem tất cả các lịch phỏng vấn, kết quả phỏng vấn, có tất cả quyền về quản lý tài khoản.
- HR: Người duyệt, sàng lọc CV, sau khi cv hợp lệ thì approve => đơn cv sẽ approve và sẽ được chuyển sang state vòng phỏng vấn 1 và submit lên hệ thống.
- interviewer: 
    - vòng phỏng vấn 1 sẽ là HR
    - vòng phỏng vấn 2 sẽ là các leader của các lĩnh vực
    - vòng phỏng vấn 3 sẽ là các leader của các lĩnh vực
    - xem được thông tin, profile, cv của interviewee
    - Có quyền sắp xếp lịch phỏng vấn của bản thân
- interviewee: cần phải đăng ký tài khoản để nộp cv, chỉ được nộp cv 1 lần duy nhất, khi bị reject thì cần 1 tháng sau mới resubmit lại được.
    - Có thể add cv vô profile (upload file)
    - Có thể theo dõi quá trình nộp đơn CV của mình.
    - nhận được các thông báo
- guest: xem được các vị trí cần tuyển dung, job description.
- Hệ thống: Khi ở từng state, hệ thống sẽ xử lý và sắp xếp các interviewer có chuyên môn về lĩnh vực đó, sau khi gửi request tới interviewer, interviewer có quyền chọn ngày + giờ để phỏng vấn interviewee. Khi có lịch phỏng vấn, bên interviewee có thể get ra được lịch phỏng vấn đó.
Khi chuyển đổi giữa các trạng thái thì notification thông qua email, sđt, trên web interviewee.
- Main flow: user apply vô, coi hết thông tin job, apply job (phải đăng ký), gửi thông tin ứng viên đến doanh nghiệp, tự CRUD cv, application -> công ty coi, bộ phận Staff, quản lý account staff (HR, interviewer), ... đẩy các state lên đến state cuối cùng là hired
- FLow nhỏ: interviewer có quyền đổi lịch hẹn sang ngày khác, truyền lịch hẹn cho người khác pv giùm, apply đơn xin nghỉ phép, hệ thống update lên -> chuyển application cho người khác có cùng chuyên môn và có time rảnh hoặc dời lịch sang ngày khác luôn. Dựa trên cái state, user nào làm state nào có lĩnh vực chuyên môn nào sẽ quản lý. khi 1 state cập nhật, get all ra những interviewer có năng lực chuyên môn dựa trên cái state đó, nếu count mà có nhiều hơn 1 người hiện tại thì có thể chuyển lịch pv cho người khác, không thì phải dời (vì chỉ có 1 người có chuyên môn phù hợp với state đó)
- 1 buổi phỏng vấn chỉ có 1 interviewee và 1 interviewer 1:1. Quản lý lịch pv: chia slot phỏng vấn ra, slot 1 từ mấy giờ đến mấy giờ, slot 2 từ mấy giờ đến mấy giờ, 1 slot diễn ra bao nhiêu phút, estimate bao nhiêu tiếng thì tự động generate ra slot, vd pv chiếm 3 slot, 1 slot dự trù, 1 slot kéo dài 15', ước tính pv đó kéo dài 30', chiếm 2 slot, mình sẽ lấy 15' dự trù, tổng là 3 slot (luôn có time dự trù)
- Slot sẽ được cấu hình bởi công ty (có khởi tạo mặc định giá trị), cấu hình gồm thời gian mỗi slot là bao nhiêu phút, với từng state phỏng vấn thì cần bao nhiêu slot. Khi cấu hình xong, interviewer chỉ cần chọn ngày giờ phỏng vấn và gửi lên, hệ thống tự ước tính thời gian kết thúc. 

## 💾 Running and Generate Swagger document
Generate swagger document:

```
yarn swagger
```

Running website:

```
yarn start
```

You can see api document at: `/api-docs`

## 📑 Technology
- Code by Typescript, use swagger autogen to generate api document
- N-Layer architecture. Route -> Controller -> Service -> Repository. Use MVVM model: all data taken from the request needs to be declared through a Request model, returning data from the service needs to restrict the data with a Response model
- JWT Token, Passport (login gg)
- Layers must be called through interfaces: (controller -> IService. Service implements IService. Service -> IRepository. Repository implements IRepository)

## 📦 Resources
[Report Daily Link](https://drive.google.com/drive/folders/1owDwhUfZCK60NCxv6Xqak-WUfj0mllVk?usp=sharing)

[Database Design](https://drive.google.com/file/d/1pnGa3Xylud8LYTC55FLcunT25QAXfxpo/view?usp=sharing)