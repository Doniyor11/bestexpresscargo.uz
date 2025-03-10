"use client"

import Link from "next/link"
import Image from "next/image"
import { Package, Box, Clock, MapPin, Truck, Globe, Phone, Mail, LocateIcon as Location } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ServiceCard } from "@/components/service-card"
import { TrackingForm } from "@/components/tracking-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

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
      description: "Мы предлагаем ряд решений по доставке, отвечающих вашим потребностям.",
      items: [
        {
          title: "Экспресс-доставка",
          description: "Варианты доставки в тот же день и на следующий день для срочных отправлений.",
        },
        {
          title: "Международная доставка",
          description: "Надежная доставка по всему миру с таможенным оформлением.",
        },
        {
          title: "Специализированная обработка",
          description: "Особый уход за хрупкими, негабаритными или чувствительными к температуре предметам.",
        },
        {
          title: "Доставка на последнюю милю",
          description: "Эффективная доставка на последнем этапе до жилых и коммерческих адресов.",
        },
        {
          title: "Запланированная доставка",
          description: "Выберите удобное для вас время доставки.",
        },
        {
          title: "Объединение посылок",
          description: "Объедините несколько отправлений, чтобы сэкономить на стоимости доставки.",
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
    },
    footer: {
      quickLinks: "Быстрые ссылки",
      contactInfo: "Контактная информация",
      address: "ул. Амира Темура, 108, Ташкент, Узбекистан",
      phone: "+998 71 123 4567",
      email: "info@bestexpressexpo.com",
      copyright: "© 2025 RZG New Express. Все права защищены.",
      followUs: "Следите за нами",
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
      description: "Biz sizning ehtiyojlaringizga javob beradigan yetkazib berish yechimlarini taklif qilamiz.",
      items: [
        {
          title: "Tezkor yetkazib berish",
          description: "Shoshilinch yuborilmalar uchun shu kuni va keyingi kuni yetkazib berish imkoniyatlari.",
        },
        {
          title: "Xalqaro yetkazib berish",
          description: "Bojxona rasmiylashtiruvi bilan ishonchli dunyo bo'ylab yetkazib berish.",
        },
        {
          title: "Maxsus ishlov berish",
          description: "Mo'rt, katta o'lchamli yoki haroratga sezgir narsalar uchun maxsus g'amxo'rlik.",
        },
        {
          title: "Oxirgi mil yetkazib berish",
          description: "Turar-joy va tijorat manzillariga samarali oxirgi bosqich yetkazib berish.",
        },
        {
          title: "Rejalashtirilgan yetkazib berish",
          description: "Qulaylik uchun o'zingizga ma'qul yetkazib berish vaqtini tanlang.",
        },
        {
          title: "Yuborilmalarni birlashtirish",
          description: "Yetkazib berish xarajatlarini tejash uchun bir nechta yuborilmalarni birlashtiring.",
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
    },
    footer: {
      quickLinks: "Tezkor havolalar",
      contactInfo: "Aloqa ma'lumotlari",
      address: "Amir Temur ko'chasi, 108, Toshkent, O'zbekiston",
      phone: "+998 71 123 4567",
      email: "info@bestexpressexpo.com",
      copyright: "© 2025 RZG New Express. Barcha huquqlar himoyalangan.",
      followUs: "Bizni kuzatib boring",
    },
  },
}

export default function Home() {
  const [language, setLanguage] = useState<"ru" | "uz">("ru")
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2023-10-26_22-27-52.jpg-TQJAha39KQNkKn2CkoGNFalDZUTZOy.jpeg"
              alt="Best Express Expo Cargo"
              width={120}
              height={40}
              className="h-12 w-auto"
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Warehouse" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full">
          <div className="flex h-full flex-col justify-center space-y-4 pt-20">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
              {language === "ru"
                ? "RZG new express - ваш надежный курьерский партнер"
                : "RZG new express - sizning ishonchli kuryer hamkoringiz"}
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.services.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.services.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <ServiceCard
                  icon={<Truck className="h-10 w-10 text-primary" />}
                  title={t.services.items[0].title}
                  description={t.services.items[0].description}
                />
                <ServiceCard
                  icon={<Globe className="h-10 w-10 text-primary" />}
                  title={t.services.items[1].title}
                  description={t.services.items[1].description}
                />
                <ServiceCard
                  icon={<Box className="h-10 w-10 text-primary" />}
                  title={t.services.items[2].title}
                  description={t.services.items[2].description}
                />
                <ServiceCard
                  icon={<MapPin className="h-10 w-10 text-primary" />}
                  title={t.services.items[3].title}
                  description={t.services.items[3].description}
                />
                <ServiceCard
                  icon={<Clock className="h-10 w-10 text-primary" />}
                  title={t.services.items[4].title}
                  description={t.services.items[4].description}
                />
                <ServiceCard
                  icon={<Package className="h-10 w-10 text-primary" />}
                  title={t.services.items[5].title}
                  description={t.services.items[5].description}
                />
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
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Company office"
                    className="aspect-video object-cover"
                  />
                </div>
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Input placeholder={t.contact.name} />
                    </div>
                    <div className="space-y-2">
                      <Input placeholder={t.contact.email} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder={t.contact.subject} />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={t.contact.message}
                    />
                  </div>
                  <Button className="w-full sm:w-auto">{t.contact.send}</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Contact illustration"
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2023-10-26_22-27-52.jpg-TQJAha39KQNkKn2CkoGNFalDZUTZOy.jpeg"
                  alt="Best Express Expo Cargo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground">
                RZG new express -{" "}
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
                <div className="flex items-start gap-2">
                  <Location className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{t.footer.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>{t.footer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>{t.footer.email}</span>
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

