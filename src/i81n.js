// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {




  "language": {
    "arabic": "Arabic",
    "english": "English"
  },




  "dashboard": {
    "title": "Dashboard",
    "signout": "Sign out",

    "post": {
      "name": "Post"
    },

    "users": {
      "name": "Users",
      "total": "Total Users",
      "recent": "Recent Users",

      "image": "User Image",
      "username": "Username",
      "email": "Email",
      "admin": "Admin",
      "doctor": "Doctor",
      "promote": "Promote ",
      "demote": "Demote",
      "date": "Date Created",
      "delete": "Delete",
      "more": "Show More",
      "no_users": "You Have No Users Yet !",
      "delete?":"Are you sure you want to delete this user ?",
      "sure_to": "Are you sure you want to ",
      "this": "this user?",
      "sure_delete": "Yes, I’m sure",
      "no_cancel": "No, cancel",

      "error": "Error fetching users:",
      "error_more": "Error fetching more users:",
      "single_error": "Error :",

      "unkown": "Unkown"
    },

    "comments": {
      "content": "Comment Content",
      "no_comment": "You have no comments yet!",
      "likes": "Likes",
      "name": "Comments",
      "total": "Total comments",
      "recent": "Recent comments",
      "delete": "Delete",
      "error": "Error fetching comments:",
      "error_more": "Error fetching more comments:",
      "error_delete": "Error deleting comment:",
      "more": "Show More",
      "empty": "You have no comments yet!",
      "delete?": "Are you sure you want to delete this comment ?",
      "sure_delete": "Yes, I’m sure",
      "no_cancel": "No, cancel",

      "unkown": "Unkown"
    },

    "posts": {
      "name": "Posts",
      "date": "Date Updated",
      "image": "Post  Image",
      "title": "Post Title",
      "category": "Category",
      "delete": "Delete",
      "edit": "Edit",


      "total": "Total posts",
      "recent": "Recent posts",
      
      "error": "Error fetching posts:",
      "error_more": "Error fetching more posts:",
      "unkown": "Unkown",
      "delete_error": "Error deleting post:",
      "more": "Show More",
      "no_posts": "You Have No Posts Yet !",
      "delete?": "Are you sure you want to delete this post?",
      "sure_delete": "Yes, I’m sure",
      "no_cancel": "No, cancel"
    },


    "profile": {
      "name": "Profile",
      "updating": "Updating...",
      "update": "Update",
      "failed_update": "Update failed.",
      "delete": "Delete Account",
      "signout": "Sign out",
      "admin": "Admin",
      "user": "User"
      
    },

    "table": {
      "all": "See all",
      "error": "Error fetching dashboard data:"

    },

    "card": {
      "last": "Last Month",
      "all": "See all",
      "error": "Error fetching dashboard data:",
      "unkown": "Unkown"

    }
  },




  "general": {
    "loading": "Loading...",
    "error": "Error: "
  },

  "header": {
    "find": "Find doctors, services...",
    "home": "Home",
    "ai_chat": "AI Chat",
    "live_chat": "Live Chat",
    "appointments": "Appointments",
    "resources": "Resource",
    "about": "About",
    "co": "Co",
    "clinic": "Clinic",
    "slogan": "Compassionate Care, Anytime",
    "my_profile": "My Profile",
    "settings": "Settings",
    "account_settings": "Account Settings",
    "sign_out": "Sign Out",
    "sign_up": "Sign Up",
    "sign_in": "Sign In"
  },


  "home": {
    "headline": "Your Trusted Partner in",
    "digital": "Digital Healthcare",
    "description": "Experience compassionate care through our integrated platform offering direct doctor communication, AI-powered consultations, and seamless healthcare management.",
    "get_started": "Get Started",
    "learn_more": "Learn More",
    "hipaa": "HIPAA Compliant",
    "rated": "5-Star Rated Service"
  },

  "featured": {
    "title": "Comprehensive Support for Your",
    "r_journey": " Recovery Journey",
    "description": "Empower your recovery with our integrated suite of support tools and resources, designed by healthcare professionals.",
    "ai_assistant": {
      "title": "AI Assistant",
      "description": "Get 24/7 support with our AI Assistant and experience seamless conversational interaction.",
      "benefits": "Enhance your user experience with instant responses and personalized assistance.",
      "cta": "Chat With AI"
    },
    "get_doctor": {
      "title": "Get a Doctor",
      "description": "Search, book, and rate therapists to find the right support for your recovery journey.",
      "benefits": "Access personalized therapy options and foster a meaningful therapeutic relationship.",
      "cta": "Find A doctor"
    },
    "resources": {
      "title": "Educational Resources",
      "description": "Access a comprehensive library of articles, videos, and materials on addiction recovery.",
      "benefits": "Expand your knowledge and gain insights to support your recovery journey."
    },
    "recovery": {
      "title": "Personalized Recovery",
      "description": "Customize your recovery journey based on individual assessments and needs.",
      "benefits": "Receive personalized recovery plans and support to achieve long-term wellness.",
      "cta": "View Recovery Plan"
    },
    "tracker": {
      "title": "Habit Tracker",
      "description": "Monitor habits, identify triggers, and track progress to maintain positive behaviors.",
      "benefits": "Set goals and see improvement in daily habits to support your recovery goals.",
      "cta": "View Habit Tracker"
    },
    "quotes": {
      "title": "Inspirational Quotes",
      "description": "\"The journey of a thousand miles begins with a single step.\"",
      "cta": "Explore More Quotes",
      "benefits": "Find motivation and encouragement to stay strong on your journey to recovery."
    },
    "coming_soon": {
      "title": "Coming Soon: Enhanced Support Features",
      "description": "We're constantly evolving to better serve your recovery needs",
      "dashboard": {
      "title": "Dashboard",
      "description": "Track your progress, set goals, and visualize data for continuous improvement.",
      "benefits": "Monitor trends and celebrate achievements along your journey to recovery.",
      "cta": "View Dashboard"
    },
    "community": {
      "title": "Community Support",
      "description": "Connect with others on a similar journey, share experiences, and find encouragement.",
      "benefits": "Build a supportive network and access resources that inspire growth and recovery.",
      "cta": "Join The Community"
    },
    "crisis": {
      "title": "Crisis Support",
      "description": "Access emergency contact options and immediate chat support with licensed counselors.",
      "benefits": "Receive compassionate assistance and guidance during critical times.",
      "cta": "Contact Crisis Support"
    }
    }
    
  },


   "appointment": {

    "confirmation": {
      "success": "Appointment loaded successfully",
      "not_found": "Appointment not found",
      "failed": "Failed to fetch appointment",
      "title": "Appointment Confirmed!",
      "with": "Your appointment with",
      "date": "Date & Time",
      "duration": "Duration",
      "notes": "Notes",
      "status": "Status",
      "view_appointments": "View All Appointments"
    },

    "form": {
      "success": "Appointment booked successfully!",
      "failed": "Booking failed",
      "sucess_update": "Status updated successfully",
      "cancelled": "cancelled",
      "loading": "Loading appointments...",
      "new": "Book New Appointment",
      "doctor": "Doctor",
      "date&time": "Date & Time",
      "notes": "Notes",
      "confirm": "Confirm Booking",
      "upcoming": "Upcoming Appointments",
      "no_appointments": "No appointments found",
      "cancel": "Cancel",
      "single_confirm": "Confirm",
      "decline": "Decline",
      "hide":"Hide Booking Form",
      "book": "Book New Appointment"
    },


    "general": {
      "date": "Date :",
      "from": "From :",
      "note": "Note :",
      "to": "To :",
      "mine": "My Appointments"
    },

    "status": {
      "completed": "completed",
      "confirmed": "confirmed",
      "cancelled": "cancelled",
      "pending": "pending"
    },

    "patient": {
      "cancel_consultaion": "Cancell Consultation",
      "consultation": "Patient Consultation"
    },

    "book": {
      "form": "Book New Appointment",
      "hide_form": "Hide Booking Form",
      "appointment_1": "Book an Appointment",
      "select_doctor": "Select Doctor",
      "loading": "Loading doctors...",
      "please_select": "Please select a doctor",
      "date_time": "Date and Time",
      "notes": "Notes",
      "appointment_2": "Book Appointment"
    }
   },


   "book": {
    "loading": "Loading...",
      "wrong": "Something went wrong!",
      "copied": "Link copied!",
      "off": "OFF",
      "description": "Description"

   },


   "books": {
    "explore": "Explore Our Book Collection",
    "discover": "Discover hand-picked titles at unbeatable deals. Whether you're seeking inspiration or adventure, find your next favorite book here.",
    "browse": "Start Browsing",
    "today_offer": "Today’s Special Offers",
    "loading": "Loading offers...",
    "featured": "Featured Books",
    "more": "View More",
    "join_community": "Join Our Reading Community",
    "subscribe_benefits": "Subscribe for updates on new arrivals, author talks, and exclusive discounts.",
    "subscribe_now": "Subscribe Now",
    "failed": "Failed to post comment.",
    "error": "An error occurred while posting the comment.",

    "comment": {
      "failed": "Failed to fetch comments:",
      "error": "Error fetching comments:",
      "length": "Comment chars must be between 1 and 200 characters.",
      "name": "Comments",
      "as": "Signed in as:",
      "must": "You must be signed in to comment.",
      "sign": "Sign In",
      "no_comments": "No comments yet!",
      "sure": "Are you sure you want to delete this comment?",
      "yes": "Yes, I’m sure",
      "no": "No, cancel",
      "error_like": "Error liking comment:",
      "error_delete": "Error deleting comment:",
      "submit": "Submit",
      "submitting": "Submitting",
      "unkown": "Unkown",
      "chars_remaining": "characters remaining"
    }
   },


   "live_chat": {
    "live": "Live Chat",
    "explore": "Explore users to start a conversation with.",
    "image": "Image",
    "video": "Video",
    "add": "Add Friend",
    "chat": "Chat"
   },

   "profile": {
    "profile": "profile",
    "username": "username",
    "email": "email",
    "password": "password",
    "update": "update",
    "delete": "Delete Account",
    "signout": "Sign out"
   },

   "about": {
    "co": "About CoClinic",
    "description1": "CoClinic is an innovative telehealth platform designed to provide seamless healthcare services through live consultations and interactive AI support. We focus on enhancing the patient experience by offering multiple avenues for interaction, including direct communication with doctors and AI-based chatbots for preliminary consultations.",
    "description2": "Our mission is to bridge the gap between patients and healthcare professionals, making healthcare accessible and convenient for everyone. Whether you need a quick consultation or in-depth medical advice, CoClinic is here to support you at every step."
   },


  "signin": {
    
    "fields_error": "All fields are required!",
    "email_error": "Please enter a valid email address!",
    "password_length": "Password must be at least 8 characters!",
    "login_falied": "Login failed.",
    "singin_sucess": "Signed in successfully!",
    "something_wrong": "Something went wrong.",






    "coclinic": "CoClinic",
    "headline": "Welcome back! Please sign in to access your account.",
    "email": "Email",
    "email_placeholder": "name@example.com",
    "password": "Password",
    "password_placeholder": "Enter Your Password",
    "button": "Sign In",

    "loading": "Signing In ...",
    "no_account": "Don't have an account?",
    "here": "Sign up here"  
  },

  "signup": {
    "fill_all1": "Please fill in all the fields before submitting.",
    "fill_all2": "Please fill in all required fields.",
    "loading": "Signing Up ...",
    "registering_error": "Registration failed.",
    "registering_sucess": "Registration successful! Please verify your email.",
    "specialization": "Specialization",
    "specialization_description": "Enter your medical specialization.",

    "admin_code": "Admin Code",
    "admin_code_description": "Enter the admin verification code.",
    "name_description": "What is your full name ?",
    "password_description": "Enter a strong password to secure your account.",
    "birthdate_description": "Select your birthdate.",
    "gender_description": "What is your gender?",
    "gender": "Gender",
    "select": "Select",
    "go_login": "Go To Login",

    "gender_options": {
      "male": "Male",
      "female": "Female"
    },






    "coclinic": "CoClinic",
    "headline": "Embark on a transformative journey with our AI-powered personalized recovery plans and habit-building strategies.",
    "select_role": "Select Role",
    "role": {
      "patient": "Patient",
      "doctor": "Doctor",
      "admin": "Admin"
    },
    "username": "Username",
    "username_description": "Please enter a unique username for your account.",
     "email": "Email",
     "email_description": "Please enter a valid email address, e.g., name@domain.com.",
     "name": "Name",
     "password": "Password",
     "birthdate": "Birthdate",
     "select_b_date": "Select Birthdate",
     "button": "Sign Up"

     


  },


     "footer": {
    "brand": "CoClinic Care",
    "description": "Committed to providing compassionate, personalized healthcare that puts you first. Your wellness journey is our priority, every step of the way.",
    "services": "Services",
    "your_email": "Your email",
    "appointments": "Appointments",
    "ai_consultation": "AI Consultation",
    "emergency_chat": "Emergency Chat",
    "recovery_plans": "Recovery Plans",
    "contact_us": "Contact Us",
    "address": "123 Health Lane, Care City, CA 98765",
    "phone": "(555) 123-4567",
    "email": "care@coclinic.com",
    "health_tips": "Health Tips",
    "subscribe_prompt": "Subscribe to our newsletter for wellness advice and updates",
    "subscribe": "Subscribe",
    "copyright": "© 2024 CoClinic - Compassionate Care for All",
    "privacy_policy": "Privacy Policy",
    "terms_of_service": "Terms of Service",
    "cookies_policy": "Cookies Policy"
  }



}
    },
    ar: {
        translation: {

  "language": {
    "arabic": "العربية",
    "english": "الإنجليزية"
  },


  "dashboard": {
  "title": "لوحة التحكم",
  "signout": "تسجيل الخروج",

  "post": {
    "name": "منشور"
  },

  "users": {
    "name": "المستخدمون",
    "total": "إجمالي المستخدمين",
    "recent": "أحدث المستخدمين",

    "image": "صورة المستخدم",
    "username": "اسم المستخدم",
    "email": "البريد الإلكتروني",
    "admin": "مسؤول",
    "doctor": "طبيب",
    "promote": "ترقية",
    "demote": "إزالة الترقية",
    "date": "تاريخ الإنشاء",
    "delete": "حذف",
    "more": "عرض المزيد",
    "no_users": "لا يوجد مستخدمون حتى الآن!",
    "delete?": "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
    "sure_to": "هل أنت متأكد أنك تريد",
    "this": "هذا المستخدم؟",
    "sure_delete": "نعم، أنا متأكد",
    "no_cancel": "لا، إلغاء",

    "error": "حدث خطأ أثناء جلب المستخدمين:",
    "error_more": "حدث خطأ أثناء تحميل المزيد من المستخدمين:",
    "single_error": "خطأ:",

    "unkown": "غير معروف"
  },

  "comments": {
    "content": "محتوى التعليق",
    "no_comment": "لا توجد تعليقات حتى الآن!",
    "likes": "الإعجابات",
    "name": "التعليقات",
    "total": "إجمالي التعليقات",
    "recent": "أحدث التعليقات",
    "delete": "حذف",
    "error": "حدث خطأ أثناء جلب التعليقات:",
    "error_more": "حدث خطأ أثناء تحميل المزيد من التعليقات:",
    "error_delete": "حدث خطأ أثناء حذف التعليق:",
    "more": "عرض المزيد",
    "empty": "لا توجد تعليقات حتى الآن!",
    "delete?": "هل أنت متأكد أنك تريد حذف هذا التعليق؟",
    "sure_delete": "نعم، أنا متأكد",
    "no_cancel": "لا، إلغاء",

    "unkown": "غير معروف"
  },

  "posts": {
    "name": "المنشورات",
    "date": "تاريخ التحديث",
    "image": "صورة المنشور",
    "title": "عنوان المنشور",
    "category": "الفئة",
    "delete": "حذف",
    "edit": "تعديل",

    "total": "إجمالي المنشورات",
    "recent": "أحدث المنشورات",
    
    "error": "حدث خطأ أثناء جلب المنشورات:",
    "error_more": "حدث خطأ أثناء تحميل المزيد من المنشورات:",
    "unkown": "غير معروف",
    "delete_error": "حدث خطأ أثناء حذف المنشور:",
    "more": "عرض المزيد",
    "no_posts": "لا توجد منشورات حتى الآن!",
    "delete?": "هل أنت متأكد أنك تريد حذف هذا المنشور؟",
    "sure_delete": "نعم، أنا متأكد",
    "no_cancel": "لا، إلغاء"
  },

  "profile": {
    "name": "الملف الشخصي",
    "updating": "جارٍ التحديث...",
    "update": "تحديث",
    "failed_update": "فشل في التحديث.",
    "delete": "حذف الحساب",
    "signout": "تسجيل الخروج",
    "admin": "مسؤول",
      "user": "مستخدم"
  },

  "table": {
    "all": "عرض الكل",
    "error": "حدث خطأ أثناء جلب بيانات لوحة التحكم:"
  },

  "card": {
    "last": "الشهر الماضي",
    "all": "عرض الكل",
    "error": "حدث خطأ أثناء جلب بيانات لوحة التحكم:",
    "unkown": "غير معروف"
  }
},



  "general": {
    "loading": "جارٍ التحميل...",
    "error": "خطأ:"
  },

  "header": {
    "find": "ابحث عن الأطباء والخدمات...",
    "home": "الرئيسية",
    "ai_chat": "مساعد الذكاء الاصطناعي",
    "live_chat": "الدردشة المباشرة",
    "appointments": "المواعيد",
    "resources": "الموارد",
    "about": "من نحن",
    "co": "Co",
    "clinic": "Clinic",
    "slogan": "رعاية رحيمة، في أي وقت",
    "my_profile": "ملفي الشخصي",
    "settings": "الإعدادات",
    "account_settings": "إعدادات الحساب",
    "sign_out": "تسجيل الخروج",
    "sign_up": "إنشاء حساب",
    "sign_in": "تسجيل الدخول"
  },

  "home": {
    "headline": "شريكك الموثوق في الرعاية ",
    "digital": "الصحية الرقمية",
    "description": "اختبر رعاية إنسانية عبر منصتنا المتكاملة التي توفر تواصلاً مباشراً مع الأطباء، واستشارات مدعومة بالذكاء الاصطناعي، وإدارة سلسة للرعاية الصحية.",
    "get_started": "ابدأ الآن",
    "learn_more": "اعرف المزيد",
    "hipaa": "متوافق مع HIPAA",
    "rated": "خدمة بتقييم 5 نجوم"
  },


  "featured": {
    "title": "دعم شامل لرحلتك ",
    "r_journey": "نحو التعافي",
    "description": "عزز تعافيك من خلال مجموعة أدوات وموارد متكاملة، مصممة من قبل متخصصين في الرعاية الصحية.",
    "ai_assistant": {
      "title": "مساعد الذكاء الاصطناعي",
      "description": "احصل على دعم متواصل على مدار الساعة من خلال مساعد الذكاء الاصطناعي وتمتع بتجربة تفاعلية سلسة.",
      "benefits": "حسّن تجربتك مع ردود فورية ومساعدة مخصصة.",
      "cta": "تحدث مع الئاكاء الاصطناعي"
    },
    "get_doctor": {
      "title": "احصل على طبيب",
      "description": "ابحث واحجز وقيّم الأطباء النفسيين للوصول إلى الدعم المناسب لرحلتك نحو التعافي.",
      "benefits": "استفد من خيارات علاجية مخصصة وابنِ علاقة علاجية فعالة.",
      "cta": "ابحث عن طبيب"
    },
    "resources": {
      "title": "موارد تعليمية",
      "description": "احصل على مكتبة شاملة من المقالات والفيديوهات والمواد المتعلقة بالتعافي من الإدمان.",
      "benefits": "وسع معرفتك واكتسب رؤى لدعم رحلتك العلاجية.",
      "cta": "استكشف الموارد"
    },
    "recovery": {
      "title": "تعافٍ مخصص",
      "description": "خصص رحلة التعافي وفقًا للتقييمات والاحتياجات الشخصية.",
      "benefits": "احصل على خطط دعم شخصية لتحقيق الشفاء على المدى الطويل.",
      "cta": "عرض خطة التعافي"
    },
    "tracker": {
      "title": "متتبع العادات",
      "description": "راقب عاداتك، وتعرف على المحفزات، وتتبع التقدم للحفاظ على السلوكيات الإيجابية.",
      "benefits": "حدد أهدافًا وشاهد تحسنًا في العادات اليومية لدعم التعافي.",
      "cta": "عرض متتبع العادات"
    },
    "quotes": {
      "title": "اقتباسات ملهمة",
      "description": "رحلة الألف ميل تبدأ بخطوة واحدة.",
      "cta": "استكشف المزيد",
      "benefits": "اعثر على التحفيز والدعم لمواصلة طريقك نحو التعافي."
    },
    "coming_soon": {
      "title": "قريبًا: ميزات دعم متقدمة",
      "description": "نحن نعمل باستمرار لتطوير خدماتنا وتلبية احتياجاتك في رحلة التعافي.",
      "dashboard": {
      "title": "لوحة التحكم",
      "benefits": "تتبع واحتفل ب انجازاتك اثناء رحلة التعافي",
      "description": "تابع تقدمك، حدد أهدافك، واستعرض بياناتك من أجل تحسين مستمر.",
      "cta": "عرض لوحة التحكم"
    },
    "community": {
      "title": "الدعم المجتمعي",
      "description": "تواصل مع الآخرين في رحلات مشابهة، وشارك الخبرات، وابحث عن الإلهام.",
      "benefits": "ابنِ شبكة دعم واستفد من الموارد التي تعزز النمو والتعافي.",
      "cta": "انضم إلى المجتمع"
    },
    "crisis": {
      "title": "دعم في الأزمات",
      "description": "احصل على خيارات اتصال طارئة ودعم فوري من مستشارين معتمدين.",
      "benefits": "تلَقَ المساعدة باهتمام وتعاطف في الأوقات الحرجة.",
      "cta": "اتصل بالدعم الطارئ"
    }
    }
  },


  "appointment": {

    "confirmation": {
      "success": "تم تحميل الموعد بنجاح",
      "not_found": "لم يتم العثور على موعد",
      "failed": "فشل في جلب بيانات الموعد",
      "title": "تم تأكيد الموعد!",
      "with": "موعدك مع",
      "date": "التاريخ والوقت",
      "duration": "المدة",
      "notes": "ملاحظات",
      "status": "الحالة",
      "view_appointments": "عرض جميع المواعيد"
    },

    "form": {
      "success": "تم حجز الموعد بنجاح!",
      "failed": "فشل الحجز",
      "sucess_update": "تم تحديث الحالة بنجاح",
      "cancelled": "تم الإلغاء",
      "loading": "جاري تحميل المواعيد...",
      "new": "حجز موعد جديد",
      "doctor": "الطبيب",
      "date&time": "التاريخ والوقت",
      "notes": "ملاحظات",
      "confirm": "تأكيد الحجز",
      "upcoming": "المواعيد القادمة",
      "no_appointments": "لا توجد مواعيد",
      "cancel": "إلغاء",
      "single_confirm": "تأكيد",
      "decline": "رفض",
      "hide": "إخفاء النموذج",
      "book": "حجز موعد جديد"
    },

    "general": {
      "date": "التاريخ:",
      "from": "من:",
      "note": "ملاحظة:",
      "to": "إلى:",
      "mine": "مواعيدي"
    },

    "status": {
      "completed": "مكتمل",
      "confirmed": "مؤكد",
      "cancelled": "ملغي",
      "pending": "قيد الانتظار"
    },

    "patient": {
      "cancel_consultaion": "إلغاء الاستشارة",
      "consultation": "استشارة المريض"
    },

    "book": {
      "form": "احجز موعد جديد",
      "hide_form": "اخفاء استمارة الحجز",
      "appointment_1": "حجز موعد",
      "select_doctor": "اختر الطبيب",
      "loading": "جارٍ تحميل الأطباء...",
      "please_select": "يرجى اختيار طبيب",
      "date_time": "التاريخ والوقت",
      "notes": "ملاحظات",
      "appointment_2": "تأكيد الحجز"
    }
  },

  "book": {
    "loading": "جاري التحميل...",
    "wrong": "حدث خطأ!",
    "copied": "تم نسخ الرابط!",
    "off": "متوقف",
    "description": "الوصف"
  },


  "books": {
    "explore": "استكشف مجموعتنا من الكتب",
    "discover": "اكتشف عناوين مختارة بعناية وبأسعار لا تُنافس. سواء كنت تبحث عن الإلهام أو المغامرة، ستجد هنا كتابك المفضل القادم.",
    "browse": "ابدأ التصفح",
    "today_offer": "عروض اليوم الخاصة",
    "loading": "جاري تحميل العروض...",
    "featured": "كتب مميزة",
    "more": "عرض المزيد",
    "join_community": "انضم إلى مجتمع القرّاء",
    "subscribe_benefits": "اشترك لتصلك التحديثات حول الإصدارات الجديدة، ولقاءات الكتّاب، والخصومات الحصرية.",
    "subscribe_now": "اشترك الآن",
    "failed": "فشل نشر التعليق.",
    "error": "حدث خطأ أثناء نشر التعليق.",

    "comment": {
      "failed": "فشل جلب التعليقات:",
      "error": "خطأ في جلب التعليقات:",
      "length": "يجب أن تتراوح التعليقات بين 1 و200 حرف.",
      "name": "التعليقات",
      "as": "تم تسجيل الدخول باسم:",
      "must": "يجب تسجيل الدخول للتعليق.",
      "sign": "تسجيل الدخول",
      "no_comments": "لا توجد تعليقات حتى الآن!",
      "sure": "هل أنت متأكد أنك تريد حذف هذا التعليق؟",
      "yes": "نعم، أنا متأكد",
      "no": "لا، إلغاء",
      "error_like": "خطأ في الإعجاب بالتعليق:",
      "error_delete": "خطأ في حذف التعليق:",
      "submit": "إرسال",
      "submitting": "جاري الإرسال...",
      "unkown": "غير معروف",
      "chars_remaining": "حروف متبقية"
    }
  },

  "live_chat": {
    "live": "الدردشة المباشرة",
    "explore": "استكشف المستخدمين لبدء محادثة معهم.",
    "image": "صورة",
    "video": "فيديو",
    "add": "إضافة صديق",
    "chat": "محادثة"
  },

  "profile": {
    "profile": "الملف الشخصي",
    "username": "اسم المستخدم",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "update": "تحديث",
    "delete": "حذف الحساب",
    "signout": "تسجيل الخروج"
  },

  "about": {
    "co": "عن CoClinic",
    "description1": "CoClinic هي منصة رعاية صحية رقمية مبتكرة تهدف إلى تقديم خدمات طبية سلسة من خلال الاستشارات المباشرة والدعم التفاعلي بالذكاء الاصطناعي. نحن نركز على تحسين تجربة المريض من خلال توفير وسائل تواصل متعددة تشمل التواصل المباشر مع الأطباء وروبوتات الدردشة الذكية للاستشارات الأولية.",
    "description2": "مهمتنا هي سد الفجوة بين المرضى والمتخصصين في الرعاية الصحية، وجعل الوصول إلى الخدمات الصحية سهلاً ومتاحاً للجميع. سواء كنت بحاجة إلى استشارة سريعة أو نصيحة طبية متعمقة، فإن CoClinic هنا لدعمك في كل خطوة."
  },

  "signin": {

  "fields_error": "جميع الحقول مطلوبة!",
  "email_error": "يرجى إدخال عنوان بريد إلكتروني صالح!",
  "password_length": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل!",
  "login_falied": "فشل تسجيل الدخول.",
  "singin_sucess": "تم تسجيل الدخول بنجاح!",
  "something_wrong": "حدث خطأ ما.",
  "no_account": "ليس لديك حساب ؟",
  "here": "انشء حساب" ,
  "loading": "جاري تسجيل الدخول...",


    "headline": "مرحباً بعودتك! يرجى تسجيل الدخول للوصول إلى حسابك.",
    "email": "البريد الإلكتروني",
    "email_placeholder": "name@example.com",
    "password": "كلمة المرور",
    "password_placeholder": "أدخل كلمة المرور الخاصة بك",
    "button": "تسجيل الدخول"
  },

  "signup": {

    "fill_all1": "يرجى تعبئة جميع الحقول قبل الإرسال.",
  "fill_all2": "يرجى تعبئة جميع الحقول المطلوبة.",
  "loading": "جاري إنشاء الحساب...",
  "registering_error": "فشل في عملية التسجيل.",
  "registering_sucess": "تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني.",
  "specialization": "التخصص",
  "specialization_description": "أدخل تخصصك الطبي.",

  "admin_code": "رمز المسؤول",
  "admin_code_description": "أدخل رمز التحقق الخاص بالمسؤول.",
  "name_description": "ما هو اسمك الكامل؟",
  "password_description": "أدخل كلمة مرور قوية لتأمين حسابك.",
  "birthdate_description": "اختر تاريخ ميلادك.",
  "gender_description": "ما هو جنسك؟",
  "gender": "الجنس",
  "select": "اختر",
  "go_login": "اذهب لتسجيل الدخول",
  "gender_options": {
      "male": "ذكر",
      "female": "انثى"
    },




    "headline": "ابدأ رحلتك التحولية مع خطط التعافي المخصصة بالذكاء الاصطناعي واستراتيجيات بناء العادات.",
    "select_role": "اختر الدور",
    "role": {
      "patient": "مريض",
      "doctor": "طبيب",
      "admin": "مسؤول"
    },
    "username": "اسم المستخدم",
    "username_description": "يرجى إدخال اسم مستخدم فريد لحسابك.",
    "email": "البريد الإلكتروني",
    "email_description": "يرجى إدخال بريد إلكتروني صالح، مثل name@domain.com.",
    "name": "الاسم",
    "password": "كلمة المرور",
    "birthdate": "تاريخ الميلاد",
    "select_b_date": "اختيار تاريخ الميلاد",
    "button": "إنشاء حساب"
},



    "footer": {
    "brand": "رعاية CoClinic",
    "description": "ملتزمون بتقديم رعاية صحية رحيمة وشخصية تضعك في المقام الأول. رحلتك نحو العافية هي أولويتنا في كل خطوة.",
    "services": "الخدمات",
    "your_email": "بريدك الالكتروني",
    "appointments": "المواعيد",
    "ai_consultation": "استشارة الذكاء الاصطناعي",
    "emergency_chat": "الدردشة الطارئة",
    "recovery_plans": "خطط التعافي",
    "contact_us": "تواصل معنا",
    "address": "123 شارع الصحة، مدينة الرعاية، كاليفورنيا 98765",
    "phone": "(555) 123-4567",
    "email": "care@coclinic.com",
    "health_tips": "نصائح صحية",
    "subscribe_prompt": "اشترك في النشرة البريدية للحصول على نصائح صحية وتحديثات",
    "subscribe": "اشترك",
    "copyright": "© 2024 CoClinic - رعاية رحيمة للجميع",
    "privacy_policy": "سياسة الخصوصية",
    "terms_of_service": "شروط الخدمة",
    "cookies_policy": "سياسة ملفات تعريف الارتباط"
  }
}
    }
};

const savedLanguage = localStorage.getItem('i18nextLng') || 'en';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en', // fallback language in case translation is missing
    interpolation: {
      escapeValue: false, // React already does escaping
    }
  });
export default i18n;
