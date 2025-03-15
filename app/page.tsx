"use client"

import Link from "next/link"
import Image from "next/image"
import { Globe, Phone, Menu } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { TrackingForm } from "@/components/tracking-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ContactForm } from "@/components/contact-form"

// Language content
const content = {
  ru: {
    nav: {
      tracking: "Отслеживать посылку",
      services: "Наши услуги",
      about: "О нас",
      partners: "Наши партнеры",
    },
    tracking: {
      title: "Отследить вашу посылку",
      description: "Введите номер отслеживания, чтобы получить обновления о вашей посылке в реальном времени.",
    },
    services: {
      title: "Наши услуги",
      description: "Мы предлагаем широкий спектр профессиональных услуг для удовлетворения ваших потребностей.",
      items: [
        {
          title: "Грузоперевозки",
          description: "Надежная и своевременная доставка грузов по всему миру с полным отслеживанием.",
          image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Таможенное оформление",
          description: "Профессиональное сопровождение и оформление всех необходимых таможенных документов.",
          image: "https://images.unsplash.com/photo-1568234928966-359c35dd8327?q=80&w=2074&auto=format&fit=crop",
        },
        {
          title: "Туры",
          description: "Организация туристических поездок и экскурсий с индивидуальным подходом.",
          image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Бизнес-услуги",
          description: "Комплексные решения для развития вашего бизнеса и выхода на международные рынки.",
          image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop",
        },
      ],
    },
    about: {
      title: "О нас",
      description: "Мы стремимся предоставлять надежные и эффективные логистические решения для наших клиентов.",
      history:
        "Best Express Expo Cargo была основана в 2010 году с целью предоставления высококачественных услуг доставки. За последние годы мы выросли и расширили наши услуги, чтобы удовлетворить растущие потребности наших клиентов.",
      mission:
        "Наша миссия - обеспечить безопасную, надежную и своевременную доставку всех ваших посылок, независимо от их размера или пункта назначения.",
    },
    contact: {
      title: "Связаться с нами",
      description: "Есть вопросы или нужна помощь? Наша команда готова помочь.",
      name: "Имя",
      email: "Эл. почта",
      subject: "Тема",
      message: "Сообщение",
      send: "Отправить сообщение",
      success: "Сообщение отправлено",
      error: "Ошибка",
      requiredFields: "Пожалуйста, заполните все обязательные поля",
    },
    footer: {
      quickLinks: "Быстрые ссылки",
      contactInfo: "Контактная информация",
      phone: "+998 97 757 57 47",
      telegram: "@jakhonshokh",
      copyright: "© 2025 Best Express Expo. Все права защищены.",
    },
    mobileMenu: {
      title: "Меню",
      language: "Язык",
      russian: "Русский",
      uzbek: "O'zbek",
    },
  },
  uz: {
    nav: {
      tracking: "Yuboritmani kuzatish",
      services: "Bizning xizmatlar",
      about: "Biz haqimizda",
      partners: "Bizning hamkorlar",
    },
    tracking: {
      title: "Yuboritmangizni kuzating",
      description: "Yuboritmangiz haqida real vaqtda yangilanishlar olish uchun kuzatuv raqamini kiriting.",
    },
    services: {
      title: "Bizning xizmatlar",
      description:
        "Biz sizning ehtiyojlaringizni qondirish uchun keng ko'lamli professional xizmatlarni taklif qilamiz.",
      items: [
        {
          title: "Yuk tashish",
          description: "Butun dunyo bo'ylab yuklarni to'liq kuzatuv bilan ishonchli va o'z vaqtida yetkazib berish.",
          image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Bojxona rasmiylashtiruvi",
          description: "Barcha zarur bojxona hujjatlarini professional yo'l-yo'riq ko'rsatish va rasmiylashtirish.",
          image: "https://images.unsplash.com/photo-1568234928966-359c35dd8327?q=80&w=2074&auto=format&fit=crop",
        },
        {
          title: "Sayohatlar",
          description: "Individual yondashuvga ega turistik sayohatlar va ekskursiyalarni tashkil etish.",
          image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Biznes xizmatlari",
          description: "Biznesingizni rivojlantirish va xalqaro bozorlarga chiqish uchun kompleks yechimlar.",
          image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop",
        },
      ],
    },
    about: {
      title: "Biz haqimizda",
      description: "Biz mijozlarimizga ishonchli va samarali logistika yechimlarini taqdim etishga intilamiz.",
      history:
        "Best Express Expo Cargo 2010 yilda yuqori sifatli yetkazib berish xizmatlarini taqdim etish maqsadida tashkil etilgan. So'nggi yillarda biz mijozlarimizning o'sib borayotgan ehtiyojlarini qondirish uchun o'sib, xizmatlarimizni kengaytirdik.",
      mission:
        "Bizning vazifamiz - barcha yuborilmalaringizni, ularning hajmi yoki manzilidan qat'i nazar, xavfsiz, ishonchli va o'z vaqtida yetkazib berishni ta'minlashdir.",
    },
    contact: {
      title: "Biz bilan bog'laning",
      description: "Savollaringiz bormi yoki yordam kerakmi? Bizning jamoamiz yordam berishga tayyor.",
      name: "Ism",
      email: "Elektron pochta",
      subject: "Mavzu",
      message: "Xabar",
      send: "Xabar yuborish",
      success: "Xabar yuborildi",
      error: "Xato",
      requiredFields: "Iltimos, barcha majburiy maydonlarni to'ldiring",
    },
    footer: {
      quickLinks: "Tezkor havolalar",
      contactInfo: "Aloqa ma'lumotlari",
      phone: "+998 97 757 57 47",
      telegram: "@jakhonshokh",
      copyright: "© 2025 Best Express Expo. Barcha huquqlar himoyalangan.",
    },
    mobileMenu: {
      title: "Menyu",
      language: "Til",
      russian: "Русский",
      uzbek: "O'zbek",
    },
  },
}

export default function Home() {
  const [language, setLanguage] = useState<"ru" | "uz">("ru")
  const [isOpen, setIsOpen] = useState(false)
  const t = content[language]

  useEffect(() => {
    // Add smooth scrolling behavior
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')

      if (link) {
        e.preventDefault()
        const id = link.getAttribute("href")
        if (id) {
          const element = document.querySelector(id)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleLinkClick)
    return () => document.removeEventListener("click", handleLinkClick)
  }, [])

  const handleMobileNavClick = (href: string) => {
    setIsOpen(false)

    // Add a small delay to allow the mobile menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 300)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Top */}
      <div className="w-full bg-background border-b">
        <div className="container flex justify-end h-10 items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+998 97 757 57 47</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>@jakhonshokh</span>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2-ZA1nScJElK6tnTutqN7FHQblaXJmfE.png"
              alt="Best Express Expo Cargo"
              width={120}
              height={40}
              className="h-16 w-auto"
              priority
            />
          </Link>
          <nav className="hidden gap-8 md:flex">
            <Link
              href="#tracking"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.nav.tracking}
            </Link>
            <Link
              href="#services"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.nav.services}
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.nav.about}
            </Link>
            <Link
              href="#partners"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.nav.partners}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground transition-colors hover:text-primary">
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("ru")}>Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("uz")}>O'zbek</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left text-xl font-bold">{t.mobileMenu.title}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <Link
                  href="#tracking"
                  className="flex items-center py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => handleMobileNavClick("#tracking")}
                >
                  {t.nav.tracking}
                </Link>
                <Link
                  href="#services"
                  className="flex items-center py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => handleMobileNavClick("#services")}
                >
                  {t.nav.services}
                </Link>
                <Link
                  href="#about"
                  className="flex items-center py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => handleMobileNavClick("#about")}
                >
                  {t.nav.about}
                </Link>
                <Link
                  href="#partners"
                  className="flex items-center py-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => handleMobileNavClick("#partners")}
                >
                  {t.nav.partners}
                </Link>

                <Separator className="my-2" />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">{t.mobileMenu.language}</h4>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        setLanguage("ru")
                        setIsOpen(false)
                      }}
                      className={`flex items-center justify-between rounded-md px-2 py-1 text-sm ${
                        language === "ru" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{t.mobileMenu.russian}</span>
                      {language === "ru" && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("uz")
                        setIsOpen(false)
                      }}
                      className={`flex items-center justify-between rounded-md px-2 py-1 text-sm ${
                        language === "uz" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{t.mobileMenu.uzbek}</span>
                      {language === "uz" && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    </button>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+998 97 757 57 47</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>@jakhonshokh</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2000&auto=format&fit=crop"
          alt="Logistics and delivery service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full">
          <div className="flex h-full flex-col justify-center space-y-4 pt-20">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
              {language === "ru"
                ? "Best Express Expo - ваш надежный курьерский партнер"
                : "Best Express Expo - sizning ishonchli kuryer hamkoringiz"}
            </h1>
            <p className="max-w-[600px] text-lg text-white/90 md:text-xl">
              {language === "ru"
                ? "Мы - динамично развивающаяся компания, предоставляющая профессиональные услуги в сфере грузоперевозок, туризма и консалтинга. Наша цель - предложить нашим клиентам надежные решения, ориентированные на их потребности."
                : "Biz - yuk tashish, turizm va konsalting sohasida professional xizmatlarni taqdim etuvchi dinamik rivojlanayotgan kompaniyamiz. Bizning maqsadimiz - mijozlarimizning ehtiyojlariga yo'naltirilgan ishonchli yechimlarnı taklif qilish."}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <section id="tracking" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.tracking.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.tracking.description}
                </p>
              </div>
              <TrackingForm />
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-12">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.services.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.services.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {t.services.items.map((service, index) => (
                  <ServiceCard
                    key={index}
                    imageSrc={service.image}
                    title={service.title}
                    description={service.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.about.title}</h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t.about.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{t.about.title}</h3>
                  <p className="text-muted-foreground">{t.about.history}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Миссия</h3>
                  <p className="text-muted-foreground">{t.about.mission}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop"
                    width={600}
                    height={400}
                    alt="Modern logistics warehouse"
                    className="aspect-video object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {language === "ru" ? "Наши партнеры" : "Bizning hamkorlar"}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {language === "ru"
                    ? "Мы гордимся сотрудничеством с ведущими компаниями в сфере логистики и транспорта."
                    : "Biz logistika va transport sohasidagi yetakchi kompaniyalar bilan hamkorlik qilishdan faxrlanamiz."}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="bg-white p-6 rounded-lg shadow-sm h-24 w-full flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=250&auto=format&fit=crop"
                  width={120}
                  height={60}
                  alt="Partner logo"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm h-24 w-full flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=250&auto=format&fit=crop"
                  width={120}
                  height={60}
                  alt="Partner logo"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm h-24 w-full flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=250&auto=format&fit=crop"
                  width={120}
                  height={60}
                  alt="Partner logo"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm h-24 w-full flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=250&auto=format&fit=crop"
                  width={120}
                  height={60}
                  alt="Partner logo"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.contact.title}</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t.contact.description}
                  </p>
                </div>
                <ContactForm
                  translations={{
                    name: t.contact.name,
                    email: t.contact.email,
                    subject: t.contact.subject,
                    message: t.contact.message,
                    send: t.contact.send,
                    success: t.contact.success,
                    error: t.contact.error,
                    requiredFields: t.contact.requiredFields,
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2070&auto=format&fit=crop"
                  width={550}
                  height={550}
                  alt="Customer support team"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-muted/40">
        <div className="container px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Logo and About */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2-ZA1nScJElK6tnTutqN7FHQblaXJmfE.png"
                  alt="Best Express Expo Cargo"
                  width={120}
                  height={40}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground">
                Best Express Expo -{" "}
                {language === "ru" ? "ваш надежный курьерский партнер" : "sizning ishonchli kuryer hamkoringiz"}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t.footer.quickLinks}</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#tracking" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.tracking}
                </Link>
                <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.services}
                </Link>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.about}
                </Link>
                <Link href="#partners" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.partners}
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t.footer.contactInfo}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>{t.footer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{t.footer.telegram}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  {language === "ru" ? "Русский" : "O'zbek"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage("ru")}>Русский</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("uz")}>O'zbek</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

