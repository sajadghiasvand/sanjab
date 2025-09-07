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
          <img src="/logo.svg" alt="Sanjab Logo" className="logo-img" />
          <div className="brand-name">
            <h2>Sanjab</h2>
            <p>سنجاب</p>
          </div>
        </div>


        <div class="contact-circle"></div>


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
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
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
          <p>
            ارسال پیامک خودکار بعد از
            هر خرید، پیام کش بک یا
            اعتبار برای مشتری می ره
          </p>
        </div>
        <div className="benefit-item">
          <p>
            تعریف طرح های متنوع
            وفاداری اعتبار، کش بک،
            امتیاز، پیامک... هرجور
            خواستی، خودت طراحی کن
          </p>
        </div>
        <div className="benefit-item">
          <p>
            گزارش دقیق روزانه ببین هر
            مشتری چندبار برگشته،
            <br />
            چند بار خرید کرده
          </p>
        </div>
        <div className="benefit-item">
          <p>
            مشاهده و تحلیل لیست
            مشتریان مشتری هارو
            بشناس، باهوش تر برخورد
            کن
          </p>
        </div>
        <div className="benefit-item">
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
        <div className='use-cases-list'>
         <p>
            اشتراک گذاری
            <br/>
             باشگاه مشتریان
          </p>
        </div>
        <div className='use-cases-list'>
          <p>
            طرح های تشویقی 
            <br/>
            (اعتبار و کش بک)
          </p>
        </div>
        <div className='use-cases-list'>
          <p>
            سامانه پیامک هوشمند
          </p>
        </div>

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
          <br />
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
          <p>با اعتبار لحظه ای سنجاب، مشتری هایی که برگشتشون
            <br />
            سخت بود برگشتن!
          </p>
          <p>کلینیک زیبایی فمیلی</p>
        </div>
      </div>

      <div className='skills-training'>
        <p>آموزش های مهارت شما</p>
        <h2>از این مسیر بیشتر بدانید</h2>
      </div>

      <div className='skills-training-list'>
        <div className='skills-training1'>
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
          <p>فکر نمی کردم انقدر راحت بتونم
            <br />
            با دوره آفلاین یاد بگیرم.
          </p>
          <button>مشاهده ویدئو</button>
        </div>
        <div className='feedback2'>
          <p>فکر نمی کردم انقدر راحت بتونم
            <br />
            با دوره آفلاین یاد بگیرم.
          </p>
          <button>مشاهده ویدئو</button>
        </div>
        <div className='feedback3'>
          <p>فکر نمی کردم انقدر راحت بتونم
            <br />
            با دوره آفلاین یاد بگیرم.
          </p>
          <button>مشاهده ویدئو</button>
        </div>
        <div className='feedback4'>
          <p>فکر نمی کردم انقدر راحت بتونم
            <br />
            با دوره آفلاین یاد بگیرم.
          </p>
          <button>مشاهده ویدئو</button>

        </div>
      </div>

      <div className='download-app'>
        <h2>دکمه زیر رو بزنید و تجربه ی عالی خودتون رو بسازید</h2>
        <h2>وقتشه یه شروع تازه داشته باشی!</h2>
        <h3>کلیک کن و با ما یه تجربه متفاوت و جذاب بساز، منتظرتیم که باهم مسیر رو به بهترین شکل بریم</h3>
        <div className="buttons-container">
          <button>App store</button>
          <button>Google Play</button>
        </div>
      </div>

      <div className="brands">
        <div className="brands-text">
          <h3>همراهان سنجاب</h3>
          <h2>در کنار بهترین ها با شما هستیم</h2>
        </div>

        <div className="brands-boxes">
          <div className="brand1">           <p>تحقیقات نشان می دهد که استفاده
            <br />
            از نرم افزار های CRM تا 300 درصد نرخ
            <br />
            تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
          </p>
          </div>
          <div className="brand2">           <p>تحقیقات نشان می دهد که استفاده
            <br />
            از نرم افزار های CRM تا 300 درصد نرخ
            <br />
            تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
          </p>
          </div>
          <div className="brand3">           <p>تحقیقات نشان می دهد که استفاده
            <br />
            از نرم افزار های CRM تا 300 درصد نرخ
            <br />
            تبدیل فرصت به مشتری را در شرکت ها افزایش می دهد.
          </p>
          </div>
          <div className="brand4">           <p>تحقیقات نشان می دهد که استفاده
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
            <h2>Sanjab<br />سنجاب</h2>
            <p>سنجاب، پلتفرم وفادارسازی و تبلیغات مویرگی
              <br />با ایجاد تجربه های جذاب، مشتریانتان را حفظ کنید.
              <br />تبلیغات هدفمند، کلید رشد و توسعه کسب و کار شما.
            </p>
          </div>

          <div class="contact-info">
            <p>شماره تماس</p>
            <h2>021-55120088</h2>
            <p>پست الکترونیک</p>
            <h2>info@Sanjab.ir</h2>
          </div>

          <div class="vertical-line"></div>

          <div class="membership">
            <h2>همیشه از سنجاب باخبر باشید</h2>
            <p>برای اطلاع از برنامه ها و اخبار جدید، عضو شوید</p>
            <div class="membership-input-group">
              <input type="text" placeholder="ایمیل خود را وارد کنید" />
              <button>عضویت</button>
            </div>

            <div class="social">
              <a href="#"><i class="instagram"></i></a>
              <a href="#"><i class="facebook"></i></a>
              <a href="#"><i class="whatsapp"></i></a>
              <a href="#"><i class="telegram"></i></a>
              <a href="#"><i class="youtube"></i></a>
            </div>
          </div>
        </div>

        <p class="copy-right">
          کلیه حقوق متعلق به مجموعه سامانه تبلیغات سنجاب می باشد.
        </p>
      </div>


    </div>
  );
}

export default App;
