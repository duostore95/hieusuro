import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle,
  Clock,
  Users,
  Star,
  Target,
  Zap,
  TrendingUp,
  Gift,
  BookOpen,
  UserCheck,
  ShoppingCart,
  Briefcase,
  Factory,
  Store,
  Laptop,
  Award,
  Heart,
  MessageCircle,
  Calendar,
  Timer,
  CreditCard,
  QrCode,
  ChevronDown,
  Trophy,
  Play,
  ArrowRight,
  Coins,
  TrendingDown,
  Building,
  GraduationCap,
  Search,
  BarChart3,
  Image,
  Globe,
  Settings,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/seo';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// Import result images
// import hieuresultImg from '@assets/image_1758445937864.png';
// import studentresultImg from '@assets/image_1758445948969.png';
// import tiktokShopeeQr from '@assets/8950K_1758526741823.jpeg';
// import comboVipQr from '@assets/9990K_1758526753478.jpeg';

const IMG_MOCK_PATH = '/attached_assets/IMG_6900_1758442234405.JPG';
const comboVipQr = IMG_MOCK_PATH;
const studentresultImg = IMG_MOCK_PATH;
const tiktokShopeeQr = IMG_MOCK_PATH;
const hieuresultImg = IMG_MOCK_PATH;
export default function ShopeeZoomLanding() {
  const { toast } = useToast();

  // Increment view count mutation for landing page
  const incrementViewMutation = useMutation({
    mutationFn: async (slug: string) => {
      return await apiRequest('POST', `/api/landing-views${slug}/view`);
    },
  });

  // Increment view count when page loads
  useEffect(() => {
    // Count every visit for accurate analytics
    incrementViewMutation.mutate('/shopeezoom');
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State for selected pricing package
  const [selectedPackage, setSelectedPackage] = useState({
    name: 'khóa ShopeeZoom',
    price: '3990K',
    fullAmount: '3.990.000 VND',
    qrCode: '/attached_assets/IMG_6900_1758442234405.JPG',
  });

  // Countdown timer for course start date
  useEffect(() => {
    const targetDate = new Date('2025-09-25T20:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Data structures for new sections
  const specialGifts = [
    {
      name: 'Khóa học Shopee ADS nâng cao trị giá 2990K',
      value: '2.990.000 VNĐ',
      description:
        'Khóa học Shopee ADS nâng cao đang được học viên đăng ký với mức chi phí 2990K, nếu bạn là học viên của khóa học kỹ lớp ShopeeZoom thì sẽ được tặng miễn phí ^^',
      icon: <BarChart3 className="h-8 w-8" />,
    },
    {
      name: 'Khóa học thiết kế trị giá 1500K',
      value: '1.500.000 VNĐ',
      description:
        'Hiếu có quay sẵn 2 khóa học thiết kế trên canva, 2 khóa học này đang bán 1500K (khoảng 120 phút dạy kỹ hơc). Và Hiếu sẽ tặng kèm cho bạn khi đăng ký khóa học ShopeeZoom này.',
      icon: <Image className="h-8 w-8" />,
    },
    {
      name: 'File thiết kế gian hàng trị giá 1900K',
      value: '1.900.000 VNĐ',
      description:
        'Thực ra con số 1900k kia Hiếu ghi hơi lỡ. Vì 1 thiết kế gian hàng trên Hiếu lấy giá cho 1 shop đã 1900K rồi. Mà quà này Hiếu tặng có tới 4 file như thế, còn tặng frame khung ảnh đại diện nữa! Nên giá có thể x4 so với 1900K.',
      icon: <Store className="h-8 w-8" />,
    },
    {
      name: 'Hoàn tiền 100% nếu không hài lòng',
      value: '3.990.000 VNĐ',
      description:
        'Nếu bạn đã học đủ 7 buổi, có thực hành làm bài tập và bạn vẫn cảm thấy mình không nhận được giá trị kiến thức gì thì cứ nhắn cho Hiếu. 100% tiền học phí sẽ được hoàn lại cho bạn!',
      icon: <Award className="h-8 w-8" />,
    },
  ];

  const curriculumStages = [
    {
      stage: 'Giai đoạn 1',
      title: 'Nghiên cứu tìm sản phẩm, thị trường ngách',
      duration: 'Buổi 1 - 2',
      details: [
        'Mục tiêu, tiềm năng, rủi ro, cơ hội kiếm tiền trên Shopee',
        'Những hình thức bán trên Shopee',
        'Những kiểu kinh doanh trên Shopee lãi cao',
        'Tiêu chí khi chọn sản phẩm để bán Shopee',
        'Cách bán hàng không cần vốn (vốn 0đ)',
        'Nghiên cứu thị trường, đối thủ, sản phẩm, khách hàng',
        'SPY đối thủ tìm kiếm nhu cầu, volume thị trường',
      ],
    },
    {
      stage: 'Giai đoạn 2',
      title: 'Xây dựng shop chuẩn SEO',
      duration: 'Buổi 2 - 3',
      details: [
        'Hướng dẫn tạo shop chuẩn SEO',
        'Thiết lập shop cơ bản đúng quy tắc',
        'Thiết kế shop',
        'Đăng sản phẩm chuẩn SEO',
        'Làm hình ảnh đẹp, cuốn hút, đúng cấu trúc',
      ],
    },
    {
      stage: 'Giai đoạn 3',
      title: 'Seeding đánh giá 5 sao & lượt bán',
      duration: 'Buổi 3 - 4',
      details: [
        'Seeding là gì?',
        'Tại sao seeding lại là yếu tố quyết định đến đơn hàng của shop',
        'Hướng dẫn chi tiết 5 thủ thuật seeding',
        'Hướng dẫn tăng lượt bán cho sản phẩm mới',
        'ĐẶC BIỆT: tham gia nhóm kín của lớp có gần 300 bạn học viên hỗ trợ chéo đơn (shop mới muốn có 100-500 đánh giá 5* RẤT ĐƠN GIẢN!)',
      ],
    },
    {
      stage: 'Giai đoạn 4',
      title: 'Marketing nội sàn, kéo traffic bền vững',
      duration: 'Buổi 4 - 5',
      details: [
        'Hướng dẫn cách làm 2 chương trình khuyến mãi siêu HOT của shopee',
        'Hướng dẫn hơn 8 cách marketing nội sàn cho shop mới',
        'Hướng dẫn cách đẩy đánh giá 5 sao gấp 5 lần thông thường',
        'Hướng dẫn cài đặt TOP các sản phẩm tại shop',
        'Các chiến lược triển khai kéo traffic nội sàn cho shop mới (và shop cũ)',
      ],
    },
    {
      stage: 'Giai đoạn 5',
      title: 'Quảng cáo Shopee ra đơn',
      duration: 'Buổi 5 - 6',
      details: [
        'Hiểu mọi thứ về thuật toán của sàn shopee',
        'Tư duy chạy quảng cáo chắc chắn có lãi',
        'Cách chạy quảng cáo tìm kiếm lên TOP 1',
        'Cách chạy quảng cáo khám phá bám đuổi khách hàng',
        'Cách chạy quảng cáo shopee giúp tăng nhận diện',
        'Thủ thuật, mẹo vặt của Hiếu khi chạy quảng cáo trên shopee',
      ],
    },
    {
      stage: 'Giai đoạn 6',
      title: 'Tối ưu Shop, nhân bản shop',
      duration: 'Buổi 6 - 7',
      details: [
        'Tối ưu shop giảm chi phí, nâng mức lợi nhuận',
        'Cách nhân bản ra nhiều shop',
        'Cách vận hành shop không bị shopee phạt',
      ],
    },
  ];

  const targetAudience = [
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: 'Tìm thêm công việc',
      description:
        'Bạn đang làm công việc chính nhưng muốn có thêm nguồn thu nhập từ bán hàng online',
      benefits: [
        'Thu nhập thêm 10-30tr/tháng',
        'Làm việc linh hoạt',
        'Không ảnh hưởng công việc chính',
      ],
    },
    {
      icon: <Store className="h-12 w-12" />,
      title: 'Chủ shop đang bán',
      description:
        'Bạn đã có shop trên Shopee nhưng doanh số thấp, muốn tăng đơn hàng và doanh thu',
      benefits: [
        'Tăng doanh số x3-x5',
        'Tối ưu chi phí quảng cáo',
        'Nâng cao ranking shop',
      ],
    },
    {
      icon: <Factory className="h-12 w-12" />,
      title: 'Chủ xưởng, t���ng kho',
      description:
        'Bạn có nguồn hàng sẵn có, muốn mở rộng kênh bán hàng trên sàn thương mại điện tử',
      benefits: [
        'Mở rộng thị trường',
        'Tăng lượng đơn hàng',
        'Giảm chi phí trung gian',
      ],
    },
    {
      icon: <Laptop className="h-12 w-12" />,
      title: 'Đang bán kênh khác',
      description:
        'Bạn đang bán trên Facebook, Instagram, TikTok và muốn mở rộng sang Shopee',
      benefits: [
        'Đa dạng kênh bán hàng',
        'Gia tăng độ tin cậy',
        'Tối ưu nguồn lực',
      ],
    },
  ];

  const dailyOrders = [
    {
      date: '15/11/2023',
      orders: 127,
      revenue: '38.5 triệu',
      image: '/attached_assets/image_1758295870543.png',
      alt: 'Biểu đồ đơn hàng ngày 15/11/2023',
    },
    {
      date: '16/11/2023',
      orders: 156,
      revenue: '47.2 triệu',
      image: '/attached_assets/image_1758296036738.png',
      alt: 'Biểu đồ đơn hàng ngày 16/11/2023',
    },
    {
      date: '17/11/2023',
      orders: 189,
      revenue: '52.8 triệu',
      image: '/attached_assets/image_1758296052364.png',
      alt: 'Biểu đồ đơn hàng ngày 17/11/2023',
    },
    {
      date: '18/11/2023',
      orders: 203,
      revenue: '61.4 triệu',
      image: '/attached_assets/image_1758296068543.png',
      alt: 'Biểu đồ đơn hàng ngày 18/11/2023',
    },
  ];

  const detailedSkills = [
    {
      category: 'Nghiên cứu & Tìm sản phẩm',
      skills: [
        'Kỹ năng nghiên cứu mọi thứ trước khi quyết định bán hàng',
        'Kỹ năng tìm được sản phẩm WIN, dễ bán',
        'Tư duy về kinh doanh online trên sàn TMĐT',
        'Kỹ năng tạo ra đơn cho shop hoàn toàn tự động',
      ],
    },
    {
      category: 'SEO & Tối ưu Shop',
      skills: [
        'Kỹ năng SEO cho sản phẩm và Shop lên TOP 1',
        'Hình ảnh chuẩn cấu trúc SEO trên sàn Shopee',
        'Seeding sản phẩm để khách hàng tin tưởng',
        'Kỹ thuật tăng x5 lần số đánh giá trong shop',
      ],
    },
    {
      category: 'Marketing & Traffic',
      skills: [
        'Kỹ năng tự tạo các luồng traffic tự nhiên, hiệu quả',
        'Nắm được kỹ năng marketing nội sàn',
        'Kỹ năng booking KOC trên Tiktok, Instagram',
        'Kỹ năng kéo traffic ngoại sàn vào shop nhờ booking, tặng quà',
      ],
    },
    {
      category: 'Quảng cáo & Bán hàng',
      skills: [
        'Cách chạy quảng cáo shopee chi phí thấp',
        'Kỹ năng tiếp thị liên kết giúp x20 lần doanh thu',
        'Xây dựng hệ thống kinh doanh vận hành 1 người',
        'Tạo ra được nhiều shop trên Shopee có đơn nhiều',
      ],
    },
  ];

  const whyChooseReasons = [
    {
      number: '01',
      title: 'Chất lượng > số lượng',
      description:
        'Với mục tiêu tập trung vào chất lượng hơn là số lượng, nên mỗi khóa học Hiếu sẽ luôn giới hạn học viên lại, để đảm bảo mang được nhiều giá trị nhất đến cả lớp. Ngoài ra Hiếu cũng có thời gian để "take care" từng shop của học viên hơn.',
      icon: <Award className="h-8 w-8" />,
    },
    {
      number: '02',
      title: 'Hiếu hỗ trợ 1-1 trọn đời',
      description:
        'Khác với ngoài kia, chỉ có hỗ trợ trên nhóm chung, hỗ trợ trong nhóm facebook, ai không hiểu gì thì đăng lên hỏi. Nhưng đối với Hiếu, khoảng thời gian đầu khi kinh doanh là khó khăn nhất, cần một người bên cạnh đồng hành, hỗ trợ khi cần. Chính vì vậy, Hiếu mới nghĩ ra cách hỗ trợ 1-1 qua Zalo trọn đời, hỗ trợ cho đến khi nào bạn bán được hàng.',
      icon: <Heart className="h-8 w-8" />,
    },
    {
      number: '03',
      title: 'Cá nhân hóa kế hoạch',
      description:
        'Chắc chắn là khi học thì bạn sẽ nhận được toàn bộ tài liệu xịn, những phần mềm bổ trợ cho việc bán hàng, Hiếu có quay màn hình lại cho từng buổi để bạn học lại. Đặc biệt, bạn sẽ nhận được một kế hoạch riêng của shop bạn. Bạn sẽ làm bài tập, gửi Hiếu, rồi Hiếu sẽ sửa bài, feedback những thứ cần tối ưu trên Shop. Mục đích vẫn là làm sao cho shop bạn phát triển.',
      icon: <UserCheck className="h-8 w-8" />,
    },
    {
      number: '04',
      title: 'Cộng đồng kinh doanh',
      description:
        'Trong quá trình học, thì bạn cũng sẽ được tham gia vào cộng đồng những người kinh doanh online, nơi mọi người sẽ giao lưu, chia sẻ. Cũng là nơi để cả lớp trao đổi buôn bán với nhau, trong cộng đồng cũng sẽ có nhiều chủ xưởng, nhiều tổng kho muốn bán sỉ, cũng sẽ có nhiều học viên chưa có nguồn hàng. Thì 2 bên có thể kết nối, rồi hợp tác với nhau.',
      icon: <Users className="h-8 w-8" />,
    },
  ];

  // Moved all schedule details to announcement section
  const scheduleDetails = [];

  const faqData = [
    {
      question: 'Mình sẽ thanh toán như thế nào?',
      answer:
        'Bạn có thể thanh toán cho Hiếu thông qua hình thức chuyển khoản ngân hàng. Nội dung chuyển khoản bạn chỉ cần điền SPXZ là được.\n\nThông tin chuyển khoản:\nTên: Cao Lê Ngọc Hiếu\nSTK Techcombank: 1581797979\nSTK Vietcombank: 9137377979\nSố tiền: 3990K\nNội dung: SPXZ',
    },
    {
      question: 'Không có sản phẩm thì có tham gia lớp học được không Hiếu ơi?',
      answer:
        'Trong khóa học Hiếu có hướng dẫn cách tìm sản phẩm, hướng dẫn cách nhập hàng và có cả học phần "dropship" – nghĩa là bán hàng mà không cần nhập hàng (chi phí gần như 0đ). Đây cũng là cách mà Hiếu khởi nghiệp với số vốn dưới 100K.\n\nNgoài ra, nếu bạn chưa có sản phẩm thì cũng có thể lấy gần 200 sản phẩm ở kho gia dụng của bên Hiếu bán trước để thực hành, sau này nếu đã có sản phẩm thì có thể tự xây riêng cho mình một shop khác nữa.\n\nP/s: Nếu shop gia dụng kia mà mỗi ngày ra được tầm 10 đơn, mỗi đơn lãi tầm 20k thôi. Thì mỗi tháng bạn sẽ có "thu nhập thụ động" là "10 đơn x 20k x 30 ngày" = 6tr/tháng. (công việc cũng đơn giản, vào check đơn và gửi thông tin cho Hiếu đóng gói thôi ^^)\n\nP/s 2: Và kho gia dụng này Hiếu chỉ dành cho học viên đăng ký khóa học thôi, người ngoài sẽ không biết và Hiếu cũng không công khai cho ai làm cả. (Bí mật và chỉ học viên ^^)',
    },
    {
      question: 'Có được xem lại video sau mỗi buổi học không Hiếu ơi?',
      answer:
        'Có nghen bạn. Trong mỗi buổi học thì Hiếu sẽ quay lại màn hình (đủ video, đủ âm thành và mặt Hiếu hehe) để bạn có thể xem lại nếu hôm đó bận việc không tham gia được hoặc nếu quên bài muốn ôn tập lại.',
    },
    {
      question: 'Thế có được học lại các khóa sau không Hiếu ơi?',
      answer:
        'Hiện tại Hiếu đang có chính sách học lại MIỄN PHÍ cho tất cả các khóa trong tương lai. Ví dụ: bạn đăng ký học khóa K10, nhưng tới K15 bạn muốn học lại thì chỉ cần nhắn zalo báo trước để Hiếu sắp xếp là được nghen ^^',
    },
    {
      question: 'Quy trình học tập sẽ như thế nào Hiếu ơi?',
      answer:
        'Sau khi thanh toán xong thì kết bạn và nhắn tin qua Zalo cho Hiếu để xác nhận (0931 459 459). Rồi đợi tới ngày để vào học, trước khi học thì Hiếu sẽ tạo nhóm Zalo, trước mỗi buổi học Hiếu sẽ gửi link Zoom để bạn tham gia vào lớp học.\n\nSau mỗi buổi học thì Hiếu sẽ gửi lại video quay màn hình để bạn tiện xem lại và thao tác kỹ thuật nếu quên bài.',
    },
    {
      question: 'Học phí tương lai có tăng không Hiếu ơi?',
      answer:
        'Chắc chắn là CÓ. Vì trong tương lai Hiếu sẽ update nhiều quyền lợi hơn, nhiều học phần hơn nữa và giá trị của khóa học này chắc chắn sẽ tăng nên học phí tăng là điều tất nhiên.',
    },
    {
      question: 'Mình có cần phải có shop để tham gia học không?',
      answer:
        'Chắc chắn là không cần thiết, vì trong khóa học Hiếu đã có phần hướng dẫn tạo shop và tối ưu shop chuẩn SEO rồi.',
    },
    {
      question:
        'Nếu không hài lòng thì mình có được hoàn lại học phí như cam kết không?',
      answer:
        'Nếu sau khi bạn học đủ 7 buổi, có tạo shop, rồi thực hành mà vẫn cảm thấy khóa học không thực sự hữu ích với bạn thì hãy nhắn qua Zalo cho Hiếu. Học phí sẽ được hoàn cho bạn đủ 100%',
    },
    {
      question:
        'Khóa này có gì đặc biệt? Có gì khác so với các khóa học khác không?',
      answer:
        'Đây là khóa học Hiếu thiết kế dựa vào kinh nghiệm thực chiến 6 năm kinh doanh trên Shopee của mình, nó sẽ trải qua gồm 6 giai đoạn. Chúng ta sẽ học và thực hành theo lộ trình có sẵn của bên Hiếu. Điều này sẽ giúp bạn tiết kiệm thời gian thử sai, tiết kiệm nhiều tiền bạc hơn.',
    },
    {
      question: 'Nếu không hiểu chỗ nào thì mình hỏi Hiếu được không?',
      answer:
        'Chắc chắn rồi. Bạn sẽ được Hiếu hỗ trợ trọn đời, hỗ trợ cho tới khi bạn bán được hàng.\n\nĐây là CAM KẾT của Hiếu, ngoài kia thì chỉ có hỗ trợ trên nhóm chat tổng hoặc đăng câu hỏi lên trên group tổng facebook mà thôi.\n\nĐối với Hiếu, đây là khóa tâm huyết của mình. Nên mọi vấn đề về bài học, thực hành bạn sẽ nhắn tin trực tiếp cho Hiếu. Hiếu sẽ là người hỗ trợ 1-1 bạn trực tiếp.',
    },
    {
      question: 'Mình chưa kinh doanh online bao giờ thì có học được không?',
      answer:
        'Bạn yên tâm là trong khóa học Hiếu có đầy đủ các phần học, dù bạn chưa từng buôn bán kinh doanh online lần nào vẫn có thể học tập và làm được.',
    },
    {
      question: 'Học xong thì mình có thể kiếm được bao nhiều tiền?',
      answer:
        'Hiếu không trả lời được câu hỏi này vì tiềm năng mà kinh doanh online mang lại là vô hạn. Sau đợt dịch vừa rồi thì bạn cũng biết là xu hướng mua sắm online của người dân đang rất cao, cứ cần cái gì là lên sàn Shopee để mua.\n\nBạn trẻ nhất học Hiếu và làm ra kết quả là chưa tới 18 tuổi. Người lớn tuổi nhất là một cô 60 tuổi có xưởng sản xuất hộp carton. Học viên đạt doanh thu cao nhất là một bạn sinh năm 1996 bán 4 tỉ / tháng.\n\nCó bạn học viên học xong làm sau 7 ngày là bán được đơn đầu tiên, những ngày sau đó đơn tăng đều từ 2 đơn lên 50 đơn / ngày.\n\nCũng có bạn làm mất 3 tháng mới ra được những đơn đầu tiên và dần dần phát triển lên.\n\nVề phần kết quả này nó cũng phụ thuộc nhiều vào sự kiên trì, nỗ lực, sự siêng năng của bạn nữa.\n\nChắc chắn là trong quá trình học và làm sẽ gặp khó khăn, Hiếu sẽ bên cạnh đồng hành cùng bạn, hỗ trợ cho bạn. Bạn cứ an tâm nghen!',
    },
    {
      question: 'Mình không biết dùng máy tính thì có làm được không?',
      answer:
        'Sẽ hơi khó một tí. Gần đây Hiếu có một anh học viên, anh ấy làm nghề sửa xe máy, không am hiểu về máy tính và công nghệ. Nhưng anh ấy rất chịu khó tìm tòi học hỏi, cái nào không biết thì tra google, hỏi thêm Hiếu. Cuối cùng cũng bán được vài đơn đầu tiên sau 30 ngày học (ảnh bán phụ tùng xe máy trên Shopee).',
    },
    {
      question: 'Mình nên bán ở sàn nào trước tiên?',
      answer:
        'Thành thật thì Hiếu vẫn khuyên bạn nên bán trên Shopee đầu tiên vì nó dễ hơn hơn Lazada, TiktokShop rất nhiều.\n\nTừ tháng 6 năm 2023 Hiếu đã nghiên cứu giáo án giảng dạy cho sàn Lazada (có casestudy kết quả thực tế của Hiếu), nên có thể đầu năm 2024 Hiếu sẽ mở lớp Lazada.\n\nVì Lazada khó hơn Shopee nên chi phí đầu tư học cũng sẽ cao hơn, nhưng Lazada sẽ là "Cú nhảy vọt" giúp cho bạn x3 x5 thậm chí x10 đơn hàng nếu làm ĐÚNG.\n\nHọc phí Hiếu đang dự kiến là 6990k/học viên, nếu đăng ký combo cho Shopee x Lazada thì học phí chỉ còn 7990K cho Shopee x Lazada (lịch học Lazada Hiếu sẽ thông báo sau, còn lịch học Shopee thì như trên nghen).',
    },
    {
      question: 'Mình sẽ được hỗ trợ qua kênh nào Hiếu?',
      answer:
        'Trong quá trình học và sau khi học xong thì Hiếu vẫn hỗ trợ cho bạn, cho dù 2 năm 5 năm nữa mà bạn có làm thì Hiếu vẫn hỗ trợ, cho dù bạn có tạo shop thứ 2 thứ 3 thì Hiếu cũng vẫn sẽ đồng hành cùng bạn.\n\nHiếu sẽ hỗ trợ trực tiếp 1-1 qua Zalo, có 1 nhóm chat và 1 group facebook để cả lớp giao lưu.',
    },
    {
      question: 'Hiếu có chắc chắn cam kết giúp mình kiếm được tiền không?',
      answer:
        'Trong khóa học Hiếu dạy toàn bộ kiến thức, quy trình mà bên Hiếu đang làm (bao gồm tự làm và làm cho doanh nghiệp). Cho tới thời điểm hiện tại thì bộ quy trình làm này vẫn mang lại doanh thu rất tốt cho hệ thống kinh doanh bên Hiếu.\n\nHiếu dám tự tin rằng, bạn chỉ cần áp dụng và làm theo những gì Hiếu chia sẻ trong khóa học này thì sẽ ra được kết quả, sẽ kiếm được tiền.\n\nNhưng điều đó cũng còn phụ thuộc vào bạn nữa, vì bạn phải kiên trì học và thực hành theo trong vài tuần. Có bạn thì học xong 1 tuần là có kết quả, nhưng cũng có bạn mất 12-15 tuần. Nên là ra số, ra đơn cũng là do bạn chịu làm hay không nữa.',
    },
    {
      question:
        'Giờ nhảy vào kinh doanh ở sàn TMĐT thì có sợ bão hòa rồi không?',
      answer:
        'Hồi 2019 Hiếu có nhảy qua chạy quảng cáo trên facebook bán thử, lúc đó Hiếu cũng sợ là bão hòa vì 2014 tới 2019 là 5 năm, ai cũng bán rất mạnh. Sau 5 năm nhảy vào có bão hòa không? Hiếu có nỗi sợ đó, nhưng mà vẫn quyết định thử. Cuối cùng team mình đã phát triển 1 sản phẩm và chạy doanh thu khoảng 1.2 – 1.5 tỉ / tháng với 1 dòng sản phẩm.\n\nVà bạn cũng biết là kinh doanh online là xu hướng của thế giới (có cả Việt Nam), nên bây giờ bắt đầu nhảy vào thì có khi lại ngon ý chứ. Còn chuyện bão hòa hay không thì Hiếu không biết, vì Hiếu thấy ai làm cũng ra số cả, thì bão hòa ở đâu ta?\n\nChỉ có điều là bây giờ nhảy vào nó sẽ hơi khó hơn ngày xưa 1 tí thôi. Khó ở đây có nghĩa là bạn phải làm chuẩn chỉnh, không phải như hồi xưa đăng đại tấm hình lên là bán được. Mà bây giờ hình phải đẹp, mô tả tiêu đều phải chuẩn SEO…',
    },
    {
      question: 'Bắt �� ��u thì vốn khoảng bao nhiều Hiếu?',
      answer:
        'Khi bắt đầu thực ra Hiếu có vốn khoảng 50k. Số tiền này để ăn mì tôm á, chớ không phải tiền nhập hàng đầu. Việc của Hiếu là đi tìm shop sỉ, ra xin chụp ảnh rồi đăng lên sàn bán, khi có đơn thì ra mua lẻ từng cái rồi về đóng gói giao cho khách. Tính ra nhập 1 sản phẩm chỉ tốn có 25k thôi.\n\nNhưng bây giờ thì cũng khác hồi xưa rồi nha, thành thực mà nói thì Hiếu vẫn khuyên bạn nên có 1 ít vốn trước khi bắt tay vào việc kinh doanh này. Tối thiểu là 3 triệu đồng (đối với người đi làm), còn với sinh viên thì có sức trẻ, sức khỏe, chịu cày thì tầm dưới 1 triệu đồng là ổn.',
    },
    {
      question: 'Có nhóm kín dành riêng cho học viên không Hiếu?',
      answer:
        'Chắc chắc là có rồi nghen. Mỗi khóa học Hiếu sẽ tạo 1 nhóm lớp riêng để cho cả lớp giao lưu, trao đổi chia sẻ kiến thức. Ngoài ra chúng ta sẽ có cộng đồng riêng (chỉ dành riêng cho Học viên, người ngoài sẽ không được vào).',
    },
    {
      question: 'Nhóm bí mật chéo đơn kiếm 100-500 đánh giá là cái gì đó Hiếu?',
      answer:
        'À phần này xịn nhất luôn đó, vì sao? Vì khi bạn là học viên thì sẽ được Hiếu mời tham gia vào nhóm kín chỉ dành cho học viên (không phải là học viên thì không được vô), nhóm này Hiếu tạo ra để cho các bạn học viên chéo đơn với nhau.\n\nVí dụ bạn học xong, bạn tạo shop, bạn muốn có 150 đánh giá 5 sao để tăng độ uy tín cho shop thì… rất là đơn giản. Chỉ cần vào nhóm lớp, nhắn 1 tin là có gần 300 bạn học viên (con số sẽ tăng sau mỗi khoá học) đẩy đơn, đẩy đánh giá cho bạn ngay. Vì sao học viên lại hỗ trợ nhau? Bí mật sẽ được bật mí ở buổi học thứ 5 ^^',
    },
  ];

  const paymentInfo = {
    bankAccounts: [
      {
        bank: 'Techcombank',
        accountNumber: '1581797979',
        accountName: 'CAO LE NGOC HIEU',
      },
    ],
    totalAmount: '3.990.000 VND',
    instructions: [
      'Chụp ảnh bill chuyển khoản',
      'Gửi ảnh bill cho Hiếu qua Zalo: 0931 459 459',
      'Hiếu gửi form thông tin lớp',
    ],
  };

  // Gallery data for tabs
  const hieuResultsGallery = [
    {
      id: 1,
      image: hieuresultImg,
      title: 'Doanh số 4 ngày đột phá',
      subtitle: '675 đơn - 199.9tr doanh thu',
      description: 'Shop bán gia dụng trong 4 ngày liên tiếp',
      stats: '169 đơn/ngày TB',
    },
    {
      id: 2,
      image: hieuresultImg,
      title: 'Kết quả tháng 11/2023',
      subtitle: '3000+ đơn trong tháng',
      description: 'Tổng hợp từ 7 shop đang vận hành',
      stats: '100+ đơn/ngày',
    },
    {
      id: 3,
      image: hieuresultImg,
      title: 'Shop #1 - Gia dụng',
      subtitle: '203 đơn - 61.4tr/ngày',
      description: 'Peak performance ngày 18/11',
      stats: 'Top 1% seller',
    },
    {
      id: 4,
      image: hieuresultImg,
      title: 'Shop #2 - Thời trang',
      subtitle: '156 đơn - 47.2tr/ngày',
      description: 'Stable growth trong Q4',
      stats: '15% conversion rate',
    },
    {
      id: 5,
      image: hieuresultImg,
      title: 'Shop #3 - Điện tử',
      subtitle: '189 đơn - 52.8tr/ngày',
      description: 'Black Friday performance',
      stats: '25% repeat customers',
    },
    {
      id: 6,
      image: hieuresultImg,
      title: 'Shop #4 - Mỹ phẩm',
      subtitle: '127 đơn - 38.5tr/ngày',
      description: 'Organic traffic growth',
      stats: '40% from SEO',
    },
    {
      id: 7,
      image: hieuresultImg,
      title: '6 năm kinh nghiệm',
      subtitle: 'Từ 0 lên 7 shop',
      description: 'Hành trình xây dựng empire',
      stats: '1000+ sản phẩm',
    },
    {
      id: 8,
      image: hieuresultImg,
      title: 'Tổng kết Q4/2023',
      subtitle: 'Revenue milestone đạt được',
      description: 'Quý cao nhất trong năm',
      stats: '300% YoY growth',
    },
    {
      id: 9,
      image: hieuresultImg,
      title: '11.11 Sale Event',
      subtitle: 'Peak day performance',
      description: 'Ngày bán cao nhất năm',
      stats: '500+ đơn/24h',
    },
    {
      id: 10,
      image: hieuresultImg,
      title: '12.12 Mega Sale',
      subtitle: 'Breakthrough results',
      description: 'Vượt mục tiêu đề ra 150%',
      stats: 'ROI 400%',
    },
    {
      id: 11,
      image: hieuresultImg,
      title: 'Tết Nguyên Đán',
      subtitle: 'Holiday season boom',
      description: 'Seasonal products trending',
      stats: '600+ đơn/ngày',
    },
    {
      id: 12,
      image: hieuresultImg,
      title: 'Portfolio overview',
      subtitle: '7 shops tổng quan',
      description: 'Multi-category business model',
      stats: 'Avg 430 đơn/shop',
    },
  ];

  const studentResultsGallery = [
    {
      id: 1,
      image: studentresultImg,
      title: '392+ học viên thành công',
      subtitle: 'Tỷ lệ thành công 95%',
      description: 'Sau 2-3 tháng học và thực hành',
      stats: 'Avg 1000+ đơn/tháng',
    },
    {
      id: 2,
      image: studentresultImg,
      title: 'Phước Đức K06',
      subtitle: '1500 đơn/tháng stable',
      description: 'Từ 0 kinh nghiệm lên top seller',
      stats: 'ROI 300%/tháng',
    },
    {
      id: 3,
      image: studentresultImg,
      title: 'Quốc Vũ K08',
      subtitle: '200tr doanh thu/tháng',
      description: 'Mẹ và bé category breakthrough',
      stats: 'x10 growth in 6 months',
    },
    {
      id: 4,
      image: studentresultImg,
      title: 'Chị Thanh K06',
      subtitle: '32 đơn peak day 11.11',
      description: 'Từ 6 gian hàng hội chợ lên Shopee',
      stats: 'Digital transformation',
    },
    {
      id: 5,
      image: studentresultImg,
      title: 'K12 Success Stories',
      subtitle: '100% completion rate',
      description: 'Latest cohort outstanding results',
      stats: 'Avg 2 months to profit',
    },
    {
      id: 6,
      image: studentresultImg,
      title: 'Corporate Trainees',
      subtitle: 'Side hustle success',
      description: 'Office workers building passive income',
      stats: '10-30tr extra income',
    },
    {
      id: 7,
      image: studentresultImg,
      title: 'Factory Owners',
      subtitle: 'Direct-to-consumer wins',
      description: 'Eliminating middleman costs',
      stats: '40% margin improvement',
    },
    {
      id: 8,
      image: studentresultImg,
      title: 'Young Entrepreneurs',
      subtitle: 'Gen Z success stories',
      description: 'Students building 6-figure businesses',
      stats: 'Age 18-25 top performers',
    },
    {
      id: 9,
      image: studentresultImg,
      title: 'Single Parents',
      subtitle: 'Financial independence',
      description: 'Work-from-home success cases',
      stats: 'Flexible income streams',
    },
    {
      id: 10,
      image: studentresultImg,
      title: 'Rural Entrepreneurs',
      subtitle: 'Geographic barriers broken',
      description: 'Small towns accessing global markets',
      stats: '50+ provinces represented',
    },
    {
      id: 11,
      image: studentresultImg,
      title: 'Career Changers',
      subtitle: 'Professional transitions',
      description: 'From traditional jobs to e-commerce',
      stats: '90% retention rate',
    },
    {
      id: 12,
      image: studentresultImg,
      title: 'Success Metrics 2024',
      subtitle: 'Year-end performance',
      description: 'Comprehensive student achievement data',
      stats: '2-3 months average to 1000 orders',
    },
  ];

  const studentFeedbackData = [
    {
      id: 1,
      name: 'Minh Anh',
      feedback:
        'Doanh thu tăng 300% sau 2 tháng h � ��c. Khóa học rất chi tiết và thực tế!',
      shopeeLink: 'shope.ee/minhanh_shop',
      achievement: 'Shop thời trang nữ',
    },
    {
      id: 2,
      name: 'Hoàng Long',
      feedback:
        'Điện tử công nghệ từ 0 lên 3500 đơn/tháng. Cảm ơn thầy Hiếu rất nhiều!',
      shopeeLink: 'shope.ee/hoanglong_tech',
      achievement: '3500 đơn/tháng',
    },
    {
      id: 3,
      name: 'Thảo My',
      feedback:
        'Handmade products bán được 800 đơn/tháng ổn định. Khóa học đáng đồng tiền bát gạo.',
      shopeeLink: 'shope.ee/thaomy_beauty',
      achievement: 'Mỹ phẩm handmade',
    },
    {
      id: 4,
      name: 'Đình Khôi',
      feedback:
        'Đồ thể thao 1200 đơn/tháng. Phương pháp của thầy rất hiệu quả và dễ hiểu.',
      shopeeLink: 'shope.ee/dinhkhoi_sports',
      achievement: '1200 đơn/tháng',
    },
    {
      id: 5,
      name: 'Văn Đức',
      feedback:
        'Gia dụng 2500 đơn/tháng. Life-changing course, recommended 100%!',
      shopeeLink: 'shope.ee/vanduc_official',
      achievement: '2500 đơn/tháng',
    },
    {
      id: 6,
      name: 'Thu Hằng',
      feedback:
        'Mỹ phẩm breakthrough từ nghi ngờ thành tin tưởng. Kết quả vượt mong đợi!',
      shopeeLink: 'shope.ee/thuhuong_store',
      achievement: 'Shop mỹ phẩm',
    },
    {
      id: 7,
      name: 'Hải Nam',
      feedback: 'Phụ kiện tech ROI vượt mong đợi. Investment tốt nhất năm nay!',
      shopeeLink: 'shope.ee/hainam_tech',
      achievement: 'Tech accessories',
    },
    {
      id: 8,
      name: 'Lan Phương',
      feedback:
        'Mẹ đơn thân kinh doanh thành công. Inspiring journey với sản phẩm mẹ và bé.',
      shopeeLink: 'shope.ee/lanphuong_baby',
      achievement: 'Baby products',
    },
    {
      id: 9,
      name: 'Tuấn Kiệt',
      feedback:
        'Dụng cụ thể thao empire. Phân tích value khóa học rất chi tiết và thực tế.',
      shopeeLink: 'shope.ee/tuankiet_sports',
      achievement: 'Sports equipment',
    },
    {
      id: 10,
      name: 'Mai Linh',
      feedback:
        'Trang sức thời trang trending. Social proof và recommendation xuất sắc!',
      shopeeLink: 'shope.ee/mailinh_jewelry',
      achievement: 'Fashion jewelry',
    },
    {
      id: 11,
      name: 'Đại Nghĩa',
      feedback:
        'Đồ trang trí nhà specialist. Course content comprehensive và detailed.',
      shopeeLink: 'shope.ee/dainghia_homedecor',
      achievement: 'Home decor',
    },
    {
      id: 12,
      name: 'Bích Phương',
      feedback:
        'Đồ gia dụng 2200 đơn/tháng ổn định. Highly recommended cho newcomers!',
      shopeeLink: 'shope.ee/bichphuong_home',
      achievement: '2200 đơn/tháng',
    },
  ];

  const handleRegistration = (courseName: string, price: string) => {
    // Update selected package info based on price
    let packageInfo;
    switch (price) {
      case '3990K':
        packageInfo = {
          name: courseName,
          price: '3990K',
          fullAmount: '3.990.000 VND',
          qrCode: '/attached_assets/IMG_6900_1758442234405.JPG',
        };
        break;
      case '8950K':
        packageInfo = {
          name: courseName,
          price: '8950K',
          fullAmount: '8.950.000 VND',
          qrCode: tiktokShopeeQr,
        };
        break;
      case '9990K':
        packageInfo = {
          name: courseName,
          price: '9990K',
          fullAmount: '9.990.000 VND',
          qrCode: comboVipQr,
        };
        break;
      default:
        packageInfo = {
          name: courseName,
          price: price,
          fullAmount: '3.990.000 VND',
          qrCode: '/attached_assets/IMG_6900_1758442234405.JPG',
        };
    }

    setSelectedPackage(packageInfo);

    // Scroll to payment section
    scrollToSection('thanhtoan');

    console.log(`Registration for ${courseName} at ${price}`);
  };

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Tạo ra được nhiều shop trên Shopee có đơn nhiều',
      description:
        'Bạn sẽ được cung cấp toàn bộ các cách làm, nội dung, tài liệu hướng dẫn, sự hỗ trợ 1-1 từ Hiếu',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Kỹ năng tạo ra đơn cho shop hoàn toàn tự động',
      description:
        'Tạo ra shop CHỈNH CHU, ĐẸP mang lại doanh thu, đơn hàng tự động (kể cả lúc ngủ hay đang đi du lịch)!',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Kỹ năng SEO cho sản phẩm và Shop lên TOP 1',
      description:
        'Đẩy được thứ hạng của sản phẩm lên TOP của sàn và thu hút được rất nhiều khách hàng',
    },
  ];

  const problems = [
    {
      number: '01',
      title: 'Không biết bắt đầu từ đâu',
      points: [
        'Chưa biết bắt đầu kinh doanh trên shopee từ đâu, làm như thế nào',
        'Không biết bây giờ cần phải làm gì để bán được hàng hóa',
        'Chưa nắm rõ quy trình nên bị mông lung, lan man nhiều thứ',
        'Kiến thức trên mạng quá nhiều, mỗi người lại nói 1 kiểu',
      ],
    },
    {
      number: '02',
      title: 'Làm hoài không ra đơn',
      points: [
        'Tạo shop nhưng 1-2 tháng rồi mãi vẫn chưa bán được hàng',
        'Có đăng sản phẩm nhưng không tối ưu SEO để tăng traffic',
        'Chạy quảng cáo nhưng đa số là lỗ hoặc chi phí gấp 3 doanh thu',
        'Phụ thuộc vào kỹ thuật "buff đơn" quá nhiều',
      ],
    },
    {
      number: '03',
      title: 'Ra đơn nhưng còn ít',
      points: [
        'Chưa biết cách seeding lượt bán và đánh giá 5 sao cho sản phẩm',
        'Chưa biết cách chọn sản phẩm có lượng đơn đột phá',
        'Chưa biết cách tối ưu Shop và sản phẩm chuẩn SEO',
        'Chưa biết cách chạy quảng cáo Shopee 1 vốn 10 lời',
      ],
    },
  ];

  const pricingPlans = [
    {
      name: 'khóa ShopeeZoom',
      originalPrice: '8.000.000 VNĐ',
      currentPrice: '3990K',
      features: [
        'Khóa học bán hàng Shopee từ A-Z',
        'Khóa học cập nhật hàng tháng',
        'Plan kế hoạch phát triển Shop',
        'Tài liệu quảng cáo Shopee',
        'Tài khoản Canva Pro trọn đời',
        'Frame khung ảnh Shopee',
        'Thiết kế gian hàng trị giá 1tr9',
        'eBook Shopee 100 đơn',
      ],
      isPopular: true,
    },
    {
      name: 'khóa TikTok Shopee',
      originalPrice: '17.000.000 VNĐ',
      currentPrice: '8950K',
      features: [
        'Khóa học bán hàng TikTok Shop từ A-Z',
        'Khóa học bán hàng Shopee từ A-Z',
        'Khóa học cập nhật hàng tháng',
        'Plan kế hoạch phát triển Shop',
        'Tài liệu quảng cáo TikTok & Shopee',
        'Tài khoản Canva Pro trọn đời',
        'Frame khung ảnh TikTok & Shopee',
        'Thiết kế gian hàng trị giá 3tr',
        'Hướng dẫn livestream bán hàng',
      ],
      isPopular: false,
      note: 'Khóa học kết hợp 2 nền tảng hot nhất hiện tại',
    },
    {
      name: 'khóa Combo VIP',
      originalPrice: '25.000.000 VNĐ',
      currentPrice: '9990K',
      features: [
        'Khóa học bán hàng Shopee từ A-Z',
        'Khóa học bán hàng TikTok Shop từ A-Z',
        'Plan kế hoạch phát triển 2 sàn',
        'Tài liệu quảng cáo 2 sàn',
        'Tài khoản Canva Pro trọn đời',
        'Frame khung ảnh 2 sàn',
        'eBook Shopee 100 đơn',
        'Thiết kế gian hàng trị giá 5 triệu',
        'Hướng dẫn livestream bán hàng',
        'Mentorship 1-1 riêng trong 6 tháng',
      ],
      isPopular: false,
    },
  ];

  return (
    <>
      <SEO
        title="ShopeeZoom - Từ Zero đến Hero bán hàng Shopee | Hiếu Suro"
        description="Khóa học ShopeeZoom với Hiếu Suro - Học bán hàng Shopee từ A-Z. Từ zero đến hero trong 30 ngày. Khóa học thực chiến với kết quả 7000+ đơn/3 ngày."
        keywords="shopeezoom, hiếu suro, khóa học shopee, bán hàng shopee, shopee seller, dropshipping shopee"
        ogImage="/attached_assets/hieu-suro-profile.png"
        canonical="https://hieusuro.replit.app/shopeezoom"
      />
      <div className="shopee-theme min-h-screen shopee-bg-gradient">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xl font-bold hover:text-primary transition-colors cursor-pointer"
                data-testid="nav-scroll-top"
              >
                SPXZ
              </button>
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => scrollToSection('quatang')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-quatang"
                >
                  QUÀ TẶNG
                </button>
                <button
                  onClick={() => scrollToSection('vande')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-vande"
                >
                  VẤN ĐỀ
                </button>
                <button
                  onClick={() => scrollToSection('chuongtrinh')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-chuongtrinh"
                >
                  CHƯƠNG TRÌNH
                </button>
                <button
                  onClick={() => scrollToSection('phuhop')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-phuhop"
                >
                  PHÙ HỢP
                </button>
                <button
                  onClick={() => scrollToSection('kynang')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-kynang"
                >
                  KỸ NĂNG
                </button>
                <button
                  onClick={() => scrollToSection('ketqua')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-ketqua"
                >
                  KẾT QUẢ
                </button>
                <button
                  onClick={() => scrollToSection('feedback')}
                  className="hover:text-primary transition-colors"
                  data-testid="nav-feedback"
                >
                  FEEDBACK
                </button>
              </div>
              <Button
                className="text-white"
                onClick={() => scrollToSection('dangky')}
                data-testid="nav-register"
              >
                Đăng ký ngay →
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 text-lg px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-300 text-white border-none">
              Khóa học Shopee Zoom
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Giúp bạn xây dựng và phát triển Shop mang về 3000 đơn mỗi tháng
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-8">
              Đã có{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                932 bạn tham gia
              </span>{' '}
              vào học và xây dựng được cho mình{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                1 - 3 Shop
              </span>{' '}
              mang lại đơn hàng đều đặn, ổn định{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                sau 2 tháng học và thực hành
              </span>
              .
            </p>

            {/* Course Info Cards */}

            <div className="bg-card rounded-lg p-6 md:p-8 mb-6 md:mb-8 border">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Thông báo về khóa học
              </h3>
              <p className="text-lg mb-4">
                Hiện tại Hiếu đang nhận đăng ký ghi danh cho khóa Shopee K46.
              </p>
              <p className="text-xl font-bold text-primary mb-6">
                (Lịch khai giảng chính thức: 25/09/2025)
              </p>

              {/* Countdown Timer - Moved from schedule section */}
              <Card
                className="max-w-lg mx-auto mb-6"
                style={{
                  background: 'linear-gradient(to right, #ffffff, #fdf2f8)',
                  border: '1px solid #f9a8d4',
                }}
              >
                <CardContent className="p-6">
                  <div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center"
                    style={{
                      background: 'inherit',
                      border: 'inherit',
                    }}
                  >
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">
                        {timeLeft.days || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Ngày</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">
                        {timeLeft.hours || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Giờ</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">
                        {timeLeft.minutes || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Phút</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">
                        {timeLeft.seconds || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Giây</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Info Cards - All schedule details moved from scheduleDetails */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      7 buổi online qua Zoom
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Học trực tiếp với Hiếu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Lịch học: 25/9 - 1/10
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      1 tháng hoàn thành khóa học
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Timer className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Thời gian: 20h - 22h
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Phù hợp người đi làm
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Nhóm lớp 100+ đánh giá 5 sao
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Chất lượng được xác nhận
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Được học lại nếu quên
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Không lo bỏ lỡ kiến thức
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Hỏi đáp, sửa bài mỗi buổi
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Giải đáp thắc mắc ngay lập tức
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Play className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Video quay màn hình
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Xem lại không giới hạn
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <GraduationCap className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      2 bài tập cuối khóa
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Thực hành ngay những gì học
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Coaching 1-1 trọn đời
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Hỗ trợ đến khi ra kết quả
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <ShoppingCart className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      200 sản phẩm thực hành
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Nguồn hàng sẵn có
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <ArrowRight className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">Nhóm chéo đơn HV</h3>
                    <p className="text-xs text-muted-foreground">
                      Hỗ trợ tăng đơn cho nhau
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Settings className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-sm">
                      Tools/Template miễn phí
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Bộ công cụ tính toán & mẫu có sẵn
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Button
              size="lg"
              className="text-lg px-6 sm:px-8 py-3 sm:py-4 animate-pulse text-white"
              onClick={() => handleRegistration('khóa ShopeeZoom', '3990K')}
              data-testid="hero-register"
            >
              Đăng ký bây giờ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Video Section - Moved up from bottom */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 md:mb-10">
              <Card className="max-w-4xl mx-auto px-4 sm:px-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/uUp8FRSQWrk"
                      title="Video nghệ của Hiếu"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-lg"
                      data-testid="youtube-video"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="vande" className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Có phải bạn đang gặp vấn đề
              </h2>
              <p className="text-xl text-foreground">
                Những khó khăn phổ biến khi bán hàng trên Shopee
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {problems.map((problem, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent mb-4">
                      {problem.number}
                    </div>
                    <h3 className="text-xl font-bold mb-6">{problem.title}</h3>
                    <ul className="space-y-3">
                      {problem.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Skills Section */}
        <section id="kynang" className="py-6 sm:py-8 md:py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Target className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kỹ năng chi tiết được học trong khóa
              </h2>
              <p className="text-xl text-foreground mb-8">
                Toàn bộ bí quyết 6 năm kinh nghiệm thực chiến của Hiếu
              </p>
              <Badge className="text-lg px-6 py-2">20+ kỹ năng cốt lõi</Badge>
            </div>

            {/* Main Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                      <div className="text-primary">{benefit.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Skills by Category */}
            <div className="space-y-8">
              {detailedSkills.map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-center">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-start p-4 bg-muted/50 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Skills Grid */}
            <div className="mt-12">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-8">
                Và còn nhiều kỹ năng khác...
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  'Kỹ năng nghiên cứu thị trường trước khi quyết định bán hàng',
                  'Nắm được kỹ năng marketing nội sàn hiệu quả',
                  'Kỹ thuật tăng x5 lần số đánh giá trong shop',
                  'Xây dựng hệ thống kinh doanh vận hành 1 người',
                  'Kỹ năng booking KOC trên Tiktok, Instagram',
                  'Kỹ năng kéo traffic ngoài sàn vào shop',
                  'Tư duy về kinh doanh online trên sàn TMĐT',
                  'Kỹ năng tự tạo các luồng traffic tự nhiên',
                  'Hình ảnh chuẩn cấu trúc SEO trên sàn Shopee',
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-card rounded-lg border"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-blue-100 to-purple-100 text-foreground border-2 border-blue-500 max-w-3xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    Cam kết kết quả
                  </h3>
                  <p className="text-lg mb-6">
                    Sau khóa học, bạn sẽ có đầy đủ kiến thức và kỹ năng để xây
                    dựng shop Shopee từ 0 lên 1000+ đơn/tháng
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100 "
                    onClick={() => scrollToSection('dangky')}
                    data-testid="skills-cta"
                  >
                    Học ngay những kỹ năng này
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Curriculum Section */}
        <section id="chuongtrinh" className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Chương trình học chi tiết
              </h2>
              <p className="text-xl text-foreground">
                6 giai đoạn học tập có hệ thống từ A-Z
              </p>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-0">
              <Accordion type="single" collapsible className="space-y-4">
                {curriculumStages.map((stage, index) => (
                  <AccordionItem
                    key={index}
                    value={`stage-${index}`}
                    className="border rounded-lg px-6"
                  >
                    <AccordionTrigger
                      className="text-left hover:no-underline py-6"
                      data-testid={`stage-${index}-trigger`}
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-left">
                            {stage.stage}
                          </h3>
                          <p className="text-primary font-semibold text-left">
                            {stage.title}
                          </p>
                          <Badge variant="outline" className="mt-2">
                            {stage.duration}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="pl-16">
                        <h4 className="font-semibold mb-4 text-lg">
                          Nội dung chi tiết:
                        </h4>
                        <ul className="space-y-3">
                          {stage.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-muted/50 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Đặc biệt</h3>
                  <p className="text-muted-foreground">
                    Mỗi khoá đều có bài tập thực hành và được Hiếu review trực
                    tiếp 1-1
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section id="phuhop" className="py-6 sm:py-8 md:py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <UserCheck className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Khóa học phù hợp với ai?
              </h2>
              <p className="text-xl text-foreground">
                4 nhóm đối tượng sẽ có lợi ích lớn nhất từ khóa học này
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-full mx-auto px-4">
              {targetAudience.map((audience, index) => (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                        <div className="text-primary">{audience.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-4">
                        {audience.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                        {audience.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-primary text-left">
                        Lợi ích:
                      </h4>
                      {audience.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-left">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="bg-primary text-primary-foreground max-w-3xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                    Không quan trọng bạn thuộc nhóm nào
                  </h3>
                  <p className="text-lg mb-6 text-white">
                    Hiếu sẽ cá nhân hóa kế hoạch học tập và phát triển phù hợp
                    với tình hình cụ thể của từng bạn
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100 "
                    onClick={() => scrollToSection('dangky')}
                    data-testid="target-audience-cta"
                  >
                    Bắt đầu hành trình của bạn
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Proof Section with Tabs */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mt-16">
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Bạn có thể kiếm được bao nhiêu đơn?
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Tất cả những gì Hiếu dạy trong khóa này là{' '}
                  <span className="font-bold text-primary">
                    kinh nghiệm 8 năm thực chiến
                  </span>{' '}
                  kinh doanh trên Shopee
                </p>
                <div className="bg-card rounded-lg p-6 max-w-4xl mx-auto px-4 sm:px-0">
                  <p className="text-base leading-relaxed">
                    Hiếu đã{' '}
                    <span className="font-bold text-primary">tốn 8 năm</span> để
                    tự học, tự làm, tự sửa sai, mất nhiều thời gian, mất nhiều
                    tiền "ngu" và mới được thành quả này. Bạn{' '}
                    <span className="font-bold text-primary">
                      không cần phải bỏ ra 8 năm
                    </span>{' '}
                    để tự mày mò tìm hiểu, bạn chỉ cần học toàn bộ kiến thức này
                    trong{' '}
                    <span className="font-bold text-primary">7 buổi học</span>{' '}
                    và được{' '}
                    <span className="font-bold text-primary">
                      Hiếu hỗ trợ trực tiếp 1-1 trọn đời.
                    </span>
                  </p>
                </div>
              </div>

              <Tabs defaultValue="hieu-results" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 max-w-2xl mx-auto">
                  <TabsTrigger
                    value="hieu-results"
                    className="text-sm font-medium"
                    data-testid="tab-hieu-results"
                  >
                    📊 Kết quả của Hiếu
                  </TabsTrigger>
                  <TabsTrigger
                    value="student-results"
                    className="text-sm font-medium"
                    data-testid="tab-student-results"
                  >
                    🎯 Kết quả Học viên
                  </TabsTrigger>
                  <TabsTrigger
                    value="student-feedback"
                    className="text-sm font-medium"
                    data-testid="tab-student-feedback"
                  >
                    ⭐ Đánh giá Học viên
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hieu-results" className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      Doanh số thực tế từ shop của Hiếu
                    </h4>
                    <p className="text-muted-foreground">
                      8 năm kinh nghiệm thực chiến - nhiều thành quả khác nhau
                    </p>
                  </div>

                  {/* Horizontal scrolling gallery */}
                  <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 w-max">
                      {hieuResultsGallery.map((item) => (
                        <div
                          key={item.id}
                          className="flex-shrink-0 w-80"
                          data-testid={`hieu-result-${item.id}`}
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow border-2 border-blue-200">
                            <CardContent className="p-6">
                              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-blue-100">
                                <img
                                  src={item.image}
                                  alt="Kết quả kinh doanh"
                                  className="w-full h-full object-contain bg-white"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll hint */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      ← Lướt qua phải để xem thêm kết quả →
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="student-results" className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      Thành tích của rất nhiều học viên
                    </h4>
                    <p className="text-muted-foreground">
                      Những câu chuyện thành công khác nhau từ học viên
                    </p>
                  </div>

                  {/* Horizontal scrolling gallery */}
                  <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 w-max">
                      {studentResultsGallery.map((item) => (
                        <div
                          key={item.id}
                          className="flex-shrink-0 w-80"
                          data-testid={`student-result-${item.id}`}
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow border-2 border-green-200">
                            <CardContent className="p-6">
                              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-green-100 mb-4">
                                <img
                                  src={item.image}
                                  alt={`${item.title} - ${item.subtitle}`}
                                  className="w-full h-full object-contain bg-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <h5 className="font-bold text-sm text-green-700">
                                  {item.title}
                                </h5>
                                <p className="text-sm font-medium text-foreground">
                                  {item.subtitle}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll hint */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      ← Lướt qua phải để xem thêm câu chuyện "ngàn đơn" →
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="student-feedback" className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      Feedback chân thực từ học viên
                    </h4>
                    <p className="text-muted-foreground">
                      100+ đánh giá 5 sao từ học viên thực tế
                    </p>
                  </div>

                  {/* Horizontal scrolling feedback cards */}
                  <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 w-max">
                      {studentFeedbackData.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="flex-shrink-0 w-80"
                          data-testid={`student-feedback-${feedback.id}`}
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow border border-orange-200 bg-gray-50/50">
                            <CardContent className="p-6 text-center">
                              {/* User Icon */}
                              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-gray-600" />
                              </div>

                              {/* Name */}
                              <h5 className="text-lg font-bold text-gray-800 mb-2">
                                {feedback.name}
                              </h5>

                              {/* 5 Stars */}
                              <div className="flex justify-center space-x-1 mb-4">
                                {[...Array(5)].map((_, index) => (
                                  <Star
                                    key={index}
                                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>

                              {/* Achievement badge */}
                              <div className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                                {feedback.achievement}
                              </div>

                              {/* Feedback Quote */}
                              <blockquote className="text-sm text-gray-700 italic mb-4 leading-relaxed">
                                "{feedback.feedback}"
                              </blockquote>

                              {/* Shopee Link Button */}
                              <button
                                onClick={() =>
                                  window.open(
                                    `https://${feedback.shopeeLink}`,
                                    '_blank'
                                  )
                                }
                                className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full text-sm transition-all duration-200"
                                data-testid={`shopee-link-feedback-${feedback.id}`}
                              >
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Xem Shop Shopee
                              </button>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll hint */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      ← Lướt qua phải để xem thêm feedback →
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Success Call to Action - Between sections */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <Card className="bg-gradient-to-r from-green-100 to-blue-100 text-foreground border-2 border-green-500 max-w-3xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    Bạn có thể là câu chuyện thành công tiếp theo!
                  </h3>
                  <p className="text-lg mb-6">
                    Với sự hướng dẫn từ Hiếu và những kiến thức thực chiến, bạn
                    hoàn toàn có thể đạt được những kết quả tương tự
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={() => scrollToSection('dangky')}
                    data-testid="success-cta"
                  >
                    Bắt đầu câu chuyện của bạn
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Special Gifts Section */}
        <section id="quatang" className="py-6 sm:py-8 md:py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Gift className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quà tặng đặc biệt khi đăng ký hôm nay
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                Trị giá hơn{' '}
                <span className="font-bold text-primary">6.390.000 VNĐ</span>{' '}
                hoàn toàn miễn phí
              </p>
              <Badge className="text-sm px-4 py-2 bg-primary text-white border-primary">
                Chỉ có trong tuần này!
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialGifts.map((gift, index) => (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-shadow border bg-white hover:border-primary/30"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <div className="text-primary">{gift.icon}</div>
                    </div>
                    <h3 className="font-bold mb-2 text-lg">{gift.name}</h3>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-3">
                      {gift.value}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {gift.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Card className="bg-white border-2 border-primary/20 max-w-2xl mx-auto hover:border-primary/30 transition-colors">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-primary">
                    Tổng giá trị quà tặng: 6.390.000 VNĐ
                  </h3>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Bạn chỉ cần thanh toán{' '}
                    <span className="font-bold text-foreground">
                      3.990.000 VNĐ
                    </span>{' '}
                    và nhận toàn bộ!
                  </p>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                    onClick={() => scrollToSection('dangky')}
                    data-testid="claim-gifts-btn"
                  >
                    Nhận ngay quà tặng
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Hieu Section */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Award className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tại sao bạn nên học của Hiếu Suro?
              </h2>
              <p className="text-xl text-foreground">
                4 lý do khiến 392+ học viên lựa chọn và thành công
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 sm:px-0 px-4">
              {whyChooseReasons.map((reason, index) => (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-shadow text-center"
                >
                  <CardContent className="p-6">
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
                      {reason.number}
                    </div>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <div className="text-primary">{reason.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold mb-4">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Cam kết chất lượng</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Hoàn tiền 100% nếu không hài lòng sau 30 ngày
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Hỗ trợ 1-1 trực tiếp từ Hiếu không giới hạn thời gian
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Học lại miễn phí tất cả khóa học trong tương lai
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">
                    Kết quả đã chứng minh
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        392+ học viên đã thành công sau khóa học
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        100+ đánh giá 5 sao từ học viên thực tế
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Nhiều học viên đạt 1000+ đơn/tháng sau 2-3 tháng
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="dangky" className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Chọn khóa học phù hợp với bạn
              </h2>
              <p className="text-xl text-foreground">
                Đầu tư một lần, hỗ trợ trọn đời
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${
                    plan.isPopular ? 'border-primary shadow-lg scale-105' : ''
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        PHỔ BIẾN NHẤT
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">
                      {plan.name}
                    </h3>
                    <div className="mb-6">
                      <div className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </div>
                      <div className="text-4xl font-bold text-primary">
                        {plan.currentPrice}
                      </div>
                    </div>
                    <p className="font-semibold mb-6">Hỗ trợ 1-1 trọn đời</p>
                    {plan.note && (
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        {plan.note}
                      </p>
                    )}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full text-white"
                      size="lg"
                      onClick={() =>
                        handleRegistration(plan.name, plan.currentPrice)
                      }
                      data-testid={`register-${index}`}
                    >
                      Đăng ký ngay →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Information Section */}
        <section id="thanhtoan" className="py-6 sm:py-8 md:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <CreditCard className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                Thông tin thanh toán
              </h2>
              <p className="text-gray-700">Thanh toán dễ dàng, nhanh chóng</p>
            </div>

            {/* Single Combined Payment Card */}
            <div className="max-w-lg mx-auto">
              <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-green-50 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 border-b border-blue-200">
                  <CardTitle className="text-center text-lg font-bold text-blue-800">
                    Thông tin thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Bank Info */}
                    <div className="space-y-6">
                      {paymentInfo.bankAccounts.map((account, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-4 border border-blue-200 shadow-sm"
                        >
                          <h4 className="font-bold text-blue-700 mb-3">
                            {account.bank}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Số tài khoản:
                              </span>
                              <span className="font-medium text-gray-900">
                                {account.accountNumber}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Chủ tài khoản:
                              </span>
                              <span className="font-medium text-gray-900">
                                {account.accountName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-green-700">
                            Tổng học phí:
                          </span>
                          <span className="font-bold text-green-600 text-xl">
                            {selectedPackage.fullAmount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code - moved below payment fee */}
                    <div className="text-center mt-6">
                      <div className="w-48 h-48 rounded-lg mx-auto mb-4 overflow-hidden border border-gray-200 bg-white">
                        <img
                          src={selectedPackage.qrCode}
                          alt={`QR Code thanh toán Techcombank ${selectedPackage.name}`}
                          className="w-full h-full object-contain"
                          data-testid="qr-code-image"
                        />
                      </div>
                      <p className="text-sm text-gray-700">
                        Quét QR code để thanh toán nhanh chóng
                      </p>
                    </div>
                  </div>

                  {/* Instructions below */}
                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Hướng dẫn sau khi chuyển khoản:
                    </h4>
                    <ol className="space-y-3">
                      {paymentInfo.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-800">
                            {instruction}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-orange-200 shadow-sm">
                    <p className="text-sm text-orange-800 font-medium">
                      <strong>Lưu ý:</strong> Sau khi chuyển khoản, bạn sẽ nhận
                      được link tham gia trong vòng 30phút.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Sẵn sàng bắt đầu hành trình kinh doanh của bạn?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Tham gia cùng 932+ học viên đã thành công
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleRegistration('khóa ShopeeZoom', '3990K')}
                data-testid="final-cta"
              >
                Đăng ký khóa học ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('thanhtoan')}
                data-testid="payment-info-cta"
              >
                Xem thông tin thanh toán
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-lg mt-6 text-white/80">
              Cam kết hoàn tiền 100% nếu không hài lòng
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Câu hỏi thường gặp
              </h2>
              <p className="text-xl text-foreground">
                Giải đáp mọi thắc mắc về khóa học
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Cột trái */}
                <Accordion type="single" collapsible className="space-y-4">
                  {faqData
                    .slice(0, Math.ceil(faqData.length / 2))
                    .map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`faq-left-${index}`}
                        className="border rounded-lg px-6"
                      >
                        <AccordionTrigger
                          className="text-left hover:no-underline py-6"
                          data-testid={`faq-left-${index}-trigger`}
                        >
                          <span className="font-semibold">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>

                {/* Cột phải */}
                <Accordion type="single" collapsible className="space-y-4">
                  {faqData
                    .slice(Math.ceil(faqData.length / 2))
                    .map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`faq-right-${index}`}
                        className="border rounded-lg px-6"
                      >
                        <AccordionTrigger
                          className="text-left hover:no-underline py-6"
                          data-testid={`faq-right-${index}-trigger`}
                        >
                          <span className="font-semibold">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-muted/50 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Vẫn còn thắc mắc?</h3>
                  <p className="text-muted-foreground mb-4">
                    Liên hệ trực tiếp với Hiếu để được tư vấn chi tiết
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      className="text-white bg-sky-500 border-sky-500 hover:bg-sky-600"
                      onClick={() =>
                        window.open('https://zalo.me/0931459459', '_blank')
                      }
                      data-testid="contact-zalo"
                    >
                      Nhắn Zalo: 0931 459 459
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() =>
                        handleRegistration('khóa ShopeeZoom', '3990K')
                      }
                      data-testid="early-registration"
                    >
                      Ghi danh sớm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-muted-foreground">
            <div
              className="mb-6 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed"
              style={{ fontSize: '12px' }}
            >
              <p>
                <strong>LƯU Ý:</strong> Hiếu không cổ vũ hay hỗ trợ bất kỳ hình
                thức “làm giàu nhanh” hoặc kiếm tiền dễ dàng nào. Điều Hiếu tin
                tưởng là làm việc chăm chỉ, tạo ra giá trị thật và phục vụ khách
                hàng một cách bền vững. Kết quả của mỗi người sẽ phụ thuộc vào
                nhiều yếu tố như hoàn cảnh cá nhân, mức độ nỗ lực và cách bạn áp
                dụng kiến thức. Những con số Hiếu chia sẻ đều đến từ trải nghiệm
                thực tế của bản thân và học viên, nhưng không phải là cam kết
                chắc chắn cho tất cả mọi người. Điều Hiếu có thể hứa là: sự đồng
                hành thật lòng. Hiếu sẽ cố gắng hỗ trợ bạn hết mình trong quá
                trình học tập và phát triển kinh doanh – để bạn làm được, hiểu
                được và tự tin đi đường dài.
              </p>
            </div>
            <p>&copy; 2024 Hiếu Suro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
