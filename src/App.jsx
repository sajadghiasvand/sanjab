import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

function App() {
  return (
    <div className="App-container">

      <header className="main-header">
        <div className="menu-toggle">☰</div>

        <div className="logo-section">
          <img src="/images/logo.png" alt="لوگو" />
        </div>


        <div className="contact-circle"></div>


        <nav className="nav-menu">
          <ul>
            <li><a href="#">آموزش</a></li>
            <li><a href="#">سوالات متداول</a></li>
            <li><a href="#">درباره ما</a></li>
            <li><a href="#">تماس با ما</a></li>
          </ul>
        </nav>

        <div className="contact-section">
          <div className="phone-box">
            <p>مشاوره رایگان و اطلاعات بیشتر</p>
            <strong>021-55120088</strong>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram">
              <img src="/images/instagram.png" alt="فیس بوک" /></i></a>
            <a href="#"><i className="fab fa-facebook">
              <img src="/images/facebook.png" alt="بنر اصلی سایت" /> </i></a>
            <a href="#"><i className="fab fa-whatsapp">
              <img src="/images/whatsapp.png" alt="بنر اصلی سایت" /> </i></a>
            <a href="#"><i className="fab fa-youtube">
              <img src="/images/youtube.png" alt="بنر اصلی سایت" /></i></a>
          </div>
        </div>
      </header>

      <div className="Ability">
        <div className='title-Ability'>
          <h2>
            تبلیغات دقیق تر
            <br />
            مشتریان وفادارتر
          </h2>
          <div className='ability-image'>
            <img src="/images/ability.png" alt="بنر اصلی سایت" />
          </div>
          <div className='ability-image2'>
            <img src="/images/Rocket 1.png" alt="بنر اصلی سایت" />

          </div>
        </div>

        <div className='p-Ability'>
          <h3>
            سنجاب، ابزار هوشمند تبلیغات مویرگی برای کسب و کار های
            <br />
            محلی، مشتری های فعلی تو حفظ کن و مشتری های جدید
            <br />
            جذب کن، بدون پیچیدگی
          </h3>
          <button>درخواست دمو رایگان</button>
        </div>

        <div className='about-sanjab'>
          <div className='about-image'>
            <img src="/images/aboutsanjab.png" alt="بنر اصلی سایت" />
          </div>

          <div className='about-image2'>
            <img src="/images/about.png" alt="بنر اصلی سایت" />
          </div>

          <div className='about-image3'>
            <img src="/images/PLANT 1.png" alt="بنر اصلی سایت" />

          </div>

          <div className='about-sanjb-app'>
            <h3>درباره سامانه سنجاب</h3>
          </div>
          <div className='title-about'>
            <h2>سنجاب؛ مشتری هاتو نگهدار، فروشتو بیشتر کن</h2>
          </div>

          <div className='p-sanjab'>
            <p>سنجاب بهت کمک می کنه مشتری هاتو بعد از خرید ، دوباره برگردونی
              <br />
              با ارسال کش بک یا اعتبار آنی بعد از خرید، مشتری ها انگیزه می گیرن که بازهم ازت خرید کنن
              <br />
              <br />
              تازه می تونی مشتری هات رو با کسب و کار های هم راستا به اشتراک بزاری.
              <br />
              مثلا اگر کلینیک زیبایی داری، مشتری هات رو به فروشگاه لوازم نوزاد معرفی کنی و برعکس.
              <br />
              <br />
              این یعنی تبلیغات مویرگی، اما دقیق و هدفمند.
            </p>
          </div>

          <div className='receive-demo'>
            <p>برای دریاف دمو، اطلاعاتتون رو وارد کنید</p>
            <input type='text' placeholder='نام و نام خانوادگی' />
            <input type='tel' placeholder='شماره همراه' />
            <button>ارسال اطلاعات</button>
          </div>
        </div>
      </div>

      <div className='benefits'>
        <h3>مزایای سامانه سنجاب</h3>
        <h2>با خرید سنجاب چه امکاناتی بهت می دیم؟</h2>
      </div>
      <div className="benefits-list">
        <div className="benefit-item">

          <div className='benefit5'>
            <img src="/images/benefit5.png" alt="بنر اصلی سایت" />

          </div>
          <p>
            ارسال پیامک خودکار بعد از
            هر خرید، پیام کش بک یا
            اعتبار برای مشتری می ره
          </p>
        </div>
        <div className="benefit-item">

          <div className='benefit4'>
            <img src="/images/benefit4.png" alt="بنر اصلی سایت" />

          </div>
          <p>
            تعریف طرح های متنوع
            وفاداری اعتبار، کش بک،
            امتیاز، پیامک... هرجور
            خواستی، خودت طراحی کن
          </p>
        </div>
        <div className="benefit-item">

          <div className='benefit3'>
            <img src="/images/benefit3.png" alt="بنر اصلی سایت" />

          </div>
          <p>
            گزارش دقیق روزانه ببین هر
            مشتری چندبار برگشته،
            <br />
            چند بار خرید کرده
          </p>
        </div>
        <div className="benefit-item">
          <div className='benefit2'>
            <img src="/images/benefit2.png" alt="بنر اصلی سایت" />

          </div>
          <p>
            مشاهده و تحلیل لیست
            مشتریان مشتری هارو
            بشناس، باهوش تر برخورد
            کن
          </p>
        </div>
        <div className="benefit-item">
          <div className='benefit1'>
            <img src="/images/benefit1.png" alt="بنر اصلی سایت" />

          </div>
          <p>
            پنل اختصاصی مدیریت پنل
            ساده و حرفه ای برای
            مدیریت طرح ها و مشتری ها
          </p>
        </div>
      </div>

      <div className='use-cases'>
        <h3>کاربرد های سامانه سنجاب</h3>
        <h2>سنجاب چطور به رشد کسب و کار شما کمک می کنه؟</h2>
        <div className='use-cases-list1'>
          <p>
       اشتراک گذاری
            باشگاه مشتریان
          </p>
        </div>
        <div className='use-cases-list2'>
          <p>
            طرح های تشویقی
            (اعتبار و کش بک)
          </p>
        </div>
        <div className='use-cases-list3'>
          <p>
            سامانه پیامک هوشمند
          </p>
        </div>
        <div className='use-cases-p'>
          <p>با سنجاب، می تونی باشگاه مشتریانت رو با مجموعه های دیگه به اشتراگ بذاری، یا حتی
            <br />
            بین بخش های مختلف کسب و کار خودت
            <br />
            مثلا اگر چند شعبه، کیلینیک یا فروشگاه داری، مشتری هارو بینشون بچرخونی و امتیاز
            <br />
            مشترک تعریف کنی .
            <br />
            یا اینکه با برند های هم راستا همکاری کنی و مشتری هارو به هم معرفی کنین.
            <br />
            ما زیرساخت این هم کاری هوشمند رو فراهم کریدم، به سادگی یک کلیک.

          </p>
        </div>
        <div className='extra-points'>
          <div><span className="check">✔️</span> اشتراک باشگاه بین چند مجموعه</div>
          <div><span className="check">✔️</span> اشتراک باشگاه داخل یک مجموعه (مثلا چند شعبه)</div>
          <div><span className="check">✔️</span> ارسال امتیاز، اعتبار یا کش بک به مشتریان شریک</div>
        </div>

      </div>

      <div className='request-demo'>
        <h3>درخواست دمو</h3>
        <h2>درخواست مشاوره و دمو رایگان</h2>
        <p>
          فقط کافیه شماره تو بزاری؛ ما باهات تماس می گیریم، ما کامل برات
          توضیح می دیم، و اگر خواستی همون روز برات راه اندازی می کنیم.
        </p>

        <input type='text' placeholder='نام و نام خانوادگی' />
        <input type='tel' placeholder='شماره همراه' />
        <button>درخواست تماس رایگان</button>
      </div>

      <div className='feedback'>
        <div className='questions'>
          <h3>سوالات پرتکرار</h3>
          <h2>پرسش و پسخ ها</h2>
          <div className='qusetions-list'>سنجاب دقیقا چطور کار می کنه؟</div>
          <div className='questions-list'>سنجاب به درد چه مشاغلی می خوره؟
            <br />
            باشگاه مشتریان نرم افزاری هست که هدف اصلی آن ارتباط با مشتریان، افزایش
            <br />رضایت مشتریان و تبدیل مشتریان عادی به مشتریان وفادار است
          </div>
          <div className='qusetions-list'>اگه مشتری گوشی هوشمند نداشته باشه؟</div>
          <div className='qusetions-list'>طرح هارو خودم طراحی می کنم؟</div>
          <div className='qusetions-list'>چقدر طول می کشه راه اندازی شه؟</div>
        </div>
        <div className='Comments'>
          <h3>نظرات کاربران</h3>
          <h2>کسب و کار ها درباره سنجاب چی میگن؟</h2>
          <div className='comments-image1'>
            <img src="/images/comments1.png" alt="بنر اصلی سایت" />
          </div>

          <p>با اعتبار لحظه ای سنجاب، مشتری هایی که برگشتشون
            <br />
            سخت بود برگشتن!
          </p>
          <div className='comments-imge2'>
            <img src="/images/comments2.png" alt="بنر اصلی سایت" />

          </div>

          <p>کلینیک زیبایی فمیلی</p>
        </div>
      </div>

      <div className='skills-training'>
        <p>آموزش های مهارت شما</p>
        <h2>از این مسیر بیشتر بدانید</h2>
      </div>

      <div className='skills-training-list'>
        <div className='skills-training1'>
          <div className='content1'>
            <img src="/images/content1.png" alt="بنر اصلی سایت" />

          </div>
          <div class="content">
            <h3>چرا میلیون ها کسب و کار در دنیا به پلتفرم های
              <br />به وفادارسازی دیجیتال اعتماد کردند؟
            </h3>
            <p>پلتفرم های وفادار سازی دیجیتال به کسب و کار های کوچک و
              <br />متوسط کمک کرده اند تا ارتباط خود با مشتریان را قوی تر کنند
              <br />و درآمدشان را افزایش دهند...
            </p>
          </div>
          <button>مشاهده بیشتر</button>
        </div>

        <div className='skills-training2'>
          <div className='content2'>
            <img src="/images/content2.png" alt="بنر اصلی سایت" />

          </div>
          <div class="content">
            <h3>5 مهارت کلیدی برای موفقیت کسب و کار های
              <br />خرد در بازار امروز
            </h3>
            <p>موفقیت در کسب و کار های خرد به مهارت های مدیریتی و
              <br />دیجیتال وابسته است. در این بخش، پنج مهارت کلیدی معرفی
              <br />شده که به شما کمک می کند...
            </p>
          </div>
          <button>مشاهده بیشتر</button>
        </div>

        <div className='skills-training3'>
          <div className='content3'>
            <img src="/images/content3.png" alt="بنر اصلی سایت" />

          </div>
          <div class="content">
            <h3>آمار جهانی : تبلیغات مویرگی چطور فروش را چند
              <br />برابر می کند؟
            </h3>
            <p>تبلیغات مویرگی یکی از موثر ترین روش های بازاریابی است که
              <br />باعث افزایش چشمگیر نرخ تبدیل مشتریان می شود...
            </p>
          </div>
          <button>مشاهده بیشتر</button>
        </div>
      </div>

      <div className='user-feedback'>
        <h3>نظرات مشتریان ما</h3>
        <h2>درمورد سنجاب چه می گویند</h2>
      </div>
      <div className='user-feedback-list'>
        <div className='feedback1'>
          <img src="/images/user1.png" alt="بنر اصلی سایت" />
        </div>
        <div className='feedback2'>
          <img src="/images/user2.png" alt="بنر اصلی سایت" />
        </div>
        <div className='feedback3'>
          <img src="/images/user3.png" alt="بنر اصلی سایت" />
        </div>
        <div className='feedback4'>
          <img src="/images/user4.png" alt="بنر اصلی سایت" />

        </div>
      </div>

      <div className='download-app'>
        <div className='app-img1'>
          <img src="/images/Mask.png" alt="بنر اصلی سایت" />
        </div>
        <div className='app-img2'>
          <img src="/images/Mockup 1.png" alt="بنر اصلی سایت" />
        </div>
        <div className='app-img3'>
          <img src="/images/Mockup2.png" alt="بنر اصلی سایت" />
        </div>
        <div className='button-p'>
          <h2>دکمه زیر رو بزنید و تجربه ی عالی خودتون رو بسازید!</h2>
        </div>
        <div className='start-p'>
          <h2>وقتشه یه شروع تازه داشته باشی!</h2>
        </div>
        <div className='click-p'>
          <h3>کلیک کن و با ما یه تجربه متفاوت و جذاب بساز، منتظرتیم که باهم مسیر رو به بهترین شکل بریم!</h3>
        </div>
        <div className="buttons-container">
          <div className='app-store'>
            <img src="/images/AppStore.png" alt="بنر اصلی سایت" />
          </div>
          <div className='google-play'>
            <img src="/images/GooglePlay.png" alt="بنر اصلی سایت" />
          </div>
        </div>


      </div>

      <div className="brands">
        <div className="brands-text">
          <h3>همراهان سنجاب</h3>
          <h2>در کنار بهترین ها با شما هستیم</h2>
        </div>


        <div className="brands-boxes">
          <div className="brand1">
            <div className='box1'>
              <img src="/images/box1.png" alt="بنر اصلی سایت" />
            </div>
            <p>تحقیقات نشان می دهد که استفاده
              <br />
              از نرم افزار های CRM تا 300 درصد نرخ
              <br />
              تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
            </p>
          </div>
          <div className="brand2">
            <div className='box2'>
              <img src="/images/box2.png" alt="بنر اصلی سایت" />
            </div>

            <p>تحقیقات نشان می دهد که استفاده
              <br />
              از نرم افزار های CRM تا 300 درصد نرخ
              <br />
              تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
            </p>
          </div>
          <div className="brand3">
            <div className='box3'>
              <img src="/images/box3.png" alt="بنر اصلی سایت" />
            </div>

            <p>تحقیقات نشان می دهد که استفاده
              <br />
              از نرم افزار های CRM تا 300 درصد نرخ
              <br />
              تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
            </p>
          </div>
          <div className="brand4">
            <div className='box4'>
              <img src="/images/box4.png" alt="بنر اصلی سایت" />
            </div>

            <p>تحقیقات نشان می دهد که استفاده
              <br />
              از نرم افزار های CRM تا 300 درصد نرخ
              <br />
              تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
            </p>
          </div>
        </div>
      </div>
      <div className="brands-paragraph-box">

        <p>نرم افزار CRM یا نرم افزار ارتباط با مشتری با ثبت و مدیریت تعاملات بین شرکت و مشتری این امکان را فراهم می آورد که مدیران کسب و کار با دیدن گزارشات، سابقه ارتباط با مشتریان و نشان گر های فروش بتوانند تصمیم های درستی برای
          <br />
          کاهش هزینه ها، افزایش فروش و رضایت مشتری بگیرند. تحقیقات نشان می دهد که استفاده از نرم افزار های crm تا 300 درصد نرخ تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد. یکی از قدیمی ترین برند ها در این حوزه
          <br />
          crm مایکروسافت می باشد. البته salesforce ، سی آر ام شرکت  SAP و Oracle نیز جزء نرم افزار های معروف می باشند. در عصر کنونی ارتباط درست با مشتری اهمیت بیشتری نسبت به فروش پیدا کرده است. این موضوع جزء اصلی
          <br />
          ترین مزیت رقابتی شرکت ها در موفقیت و فروش بیشتر است.
        </p>

        <button>مشاهده بیشتر</button>
      </div>
      <div />


      <div class="footer">
        <div class="footer-top">
          <div class="about">
            <div className='footer-logo'>
              <img src="/images/logo.png" alt="بنر اصلی سایت" />
            </div>
            <p>سنجاب، پلتفرم وفادارسازی و تبلیغات مویرگی
              با ایجاد تجربه های جذاب، مشتریانتان را حفظ کنید.
              تبلیغات هدفمند، کلید رشد و توسعه کسب و کار شما.
            </p>
          </div>

          <div class="contact-info">
            <div className='phone'>
              <p>شماره تماس</p>
              <h2>021-55120088</h2>
              <img src="/images/phone.png" alt="بنر اصلی سایت" />
            </div>
            <div className='email'>
              <p>پست الکترونیک</p>
              <h2>info@Sanjab.ir</h2>
              <img src="/images/email.png" alt="بنر اصلی سایت" />
            </div>
          </div>

          <div class="vertical-line">
            <img src="/images/Line 65.png" alt="بنر اصلی سایت" />

          </div>

          <div class="membership">
            <h2>همیشه از سنجاب باخبر باشید</h2>
            <p>برای اطلاع از برنامه ها و اخبار جدید، می تونید عضو بشید</p>
            <div class="membership-input-group">
              <input type="text" placeholder="ایمیل خود را وارد کنید" />
              <button>عضویت</button>
            </div>


            <div class="social">
              <a href="#"><i class="instagram">
                <img src="/images/instagram1.png" alt="بنر اصلی سایت" /></i></a>
              <a href="#"><i class="facebook">
                <img src="/images/facebook1.png" alt="بنر اصلی سایت" /> </i></a>
              <a href="#"><i class="whatsapp">
                <img src="/images/whatsapp1.png" alt="بنر اصلی سایت" /></i></a>
              <a href="#"><i class="twitter">
                <img src="/images/twitter.png" alt="بنر اصلی سایت" /> </i></a>
              <a href="#"><i class="youtube">
                <img src="/images/youtube1.png" alt="بنر اصلی سایت" /> </i></a>
            </div>
          </div>
        </div>
        <div className='line'>
          <img src="/images/Line 65.png" alt="بنر اصلی سایت" />
        </div>

        <div className="copy-right">
          <p>
            کلیه حقوق متعلق به مجموعه سامانه تبلیغات سنجاب می باشد.
          </p>
        </div>
      </div>


    </div>
  );
}

export default App;
