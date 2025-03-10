"use client"

import Script from "next/script";

export default function Home() {
  return (
    <>
      {/* Scripts e CSS do head */}
      <Script id="litespeed-docref" strategy="beforeInteractive">
        {`var litespeed_docref=sessionStorage.getItem("litespeed_docref");litespeed_docref&&(Object.defineProperty(document,"referrer",{get:function(){return litespeed_docref}}),sessionStorage.removeItem("litespeed_docref"));`}
      </Script>

      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '746707343203319');
          fbq('track', 'PageView');
        `}
      </Script>

      <Script id="google-analytics" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=UA-54227634-44" />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'UA-54227634-44');
        `}
      </Script>

      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NZSM93D');
        `}
      </Script>

      {/* CSS Externo convertido para CSS in-line */}
      <style jsx global>{`
        /* CSS do arquivo a200660dcbcc87a89fffd6443cfa8055.css */
        .elementor-section.elementor-section-boxed>.elementor-container{max-width:1140px}
        .e-con{--container-max-width:1140px}
        .elementor-widget:not(:last-child){margin-bottom:20px}
        .elementor-element{--widgets-spacing:20px}
        @media(max-width:1024px){
          .elementor-section.elementor-section-boxed>.elementor-container{max-width:1024px}
          .e-con{--container-max-width:1024px}
        }
        @media(max-width:767px){
          .elementor-section.elementor-section-boxed>.elementor-container{max-width:767px}
          .e-con{--container-max-width:767px}
        }
        .elementor-widget-image{text-align:center}
        .elementor-widget-image a{display:inline-block}
        .elementor-widget-image a img[src$=".svg"]{width:48px}
        .elementor-widget-image img{vertical-align:middle;display:inline-block}

        /* Estilos originais */
        .blura {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .elementor-element {
          position: relative;
        }
        .e-con-boxed {
          max-width: 1140px;
          margin-left: auto;
          margin-right: auto;
        }
        .e-con-inner {
          width: 100%;
          position: relative;
        }
        .elementor-widget-container {
          transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }
        .elementor-button {
          display: inline-block;
          line-height: 1;
          background-color: #3B99C7;
          font-size: 15px;
          padding: 12px 24px;
          border-radius: 3px;
          color: #fff;
          fill: #fff;
          text-align: center;
          transition: all .3s;
          border: none;
          text-decoration: none;
        }
        .elementor-button:hover {
          background-color: #2980b9;
          color: #fff;
        }
        img[data-lazyloaded] {
          opacity: 0;
        }
        img.litespeed-loaded {
          opacity: 1;
          transition: opacity .5s linear;
        }

        /* Estilos adicionais do Elementor */
        :root{
          --e-global-color-primary: #6EC1E4;
          --e-global-color-secondary: #54595F;
          --e-global-color-text: #7A7A7A;
          --e-global-color-accent: #61CE70;
          --e-global-typography-primary-font-family: "Roboto";
          --e-global-typography-primary-font-weight: 600;
          --e-global-typography-secondary-font-family: "Roboto Slab";
          --e-global-typography-secondary-font-weight: 400;
          --e-global-typography-text-font-family: "Roboto";
          --e-global-typography-text-font-weight: 400;
          --e-global-typography-accent-font-family: "Roboto";
          --e-global-typography-accent-font-weight: 500;
        }

        /* Estilos específicos da página */
        body {
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .elementor-heading-title {
          padding: 0;
          margin: 0;
          line-height: 1;
        }
        .elementor-widget-heading .elementor-heading-title[class*="elementor-size-"] > a {
          color: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        .elementor-widget-heading .elementor-heading-title.elementor-size-small {
          font-size: 15px;
        }
        .elementor-widget-heading .elementor-heading-title.elementor-size-medium {
          font-size: 19px;
        }
        .elementor-widget-heading .elementor-heading-title.elementor-size-large {
          font-size: 29px;
        }
        .elementor-widget-heading .elementor-heading-title.elementor-size-xl {
          font-size: 39px;
        }
        .elementor-widget-heading .elementor-heading-title.elementor-size-xxl {
          font-size: 59px;
        }
      `}</style>

      <main className="w-full min-h-screen">
        {/* Seção Hero */}
        <div className="elementor-element elementor-element-1fe36ef7 blura e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-55f4f22e elementor-widget__width-initial elementor-widget elementor-widget-heading">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  <b>⏳ Em 5 minutos, <span style={{color: "#00fdff"}}>muito mais autoridade</span> para sua clínica ou consultório.</b>
                </h2>
              </div>
            </div>

            <div className="elementor-element elementor-element-e5730f1 elementor-widget elementor-widget-image">
              <div className="elementor-widget-container">
                <img 
                  src="https://eixo.digital/wp-content/uploads/2025/01/mockup-celulares-1.png"
                  width="1000"
                  height="750"
                  alt="Mockup celulares"
                  className="attachment-full size-full wp-image-18704"
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
              </div>
            </div>

            <div className="elementor-element elementor-element-f0790b7 elementor-widget__width-initial elementor-widget elementor-widget-heading">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  <b>Tenha um <span style={{color: "#00fdff"}}>link na bio</span> profissional e aumente seus agendamentos.</b>
                </h2>
              </div>
            </div>

            <div className="elementor-element elementor-element-5f7978e elementor-widget elementor-widget-button">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-sm" href="https://pay.kiwify.com.br/CZzpbxv">
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-text">Aumente seus agendamentos!</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Benefícios */}
        <div className="elementor-element elementor-element-7d4e9f8 e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-139fcc6 elementor-widget elementor-widget-heading">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  <span style={{color: "#3B99C7"}}>Benefícios</span> do Pack MedBio
                </h2>
              </div>
            </div>

            {/* Lista de Benefícios */}
            <div className="elementor-element elementor-element-d5eea8a e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-9be6889 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-ecad0d4 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">✅ Link na bio profissional</h2>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-647246a elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">✅ Templates prontos para usar</h2>
                </div>
              </div>
              <div className="elementor-element elementor-element-647246a elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">✅ Aumente seus agendamentos</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Preço */}
        <div className="elementor-element elementor-element-a5924b9 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-a8bfee5 elementor-widget elementor-widget-heading">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">
                De <span style={{textDecoration: "line-through", color: "white"}}>R$646,00</span> por:
              </h2>
            </div>
          </div>
          <div className="elementor-element elementor-element-9653be7 elementor-widget elementor-widget-heading">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">R$ 37</h2>
            </div>
          </div>
        </div>

        {/* Seção FAQ */}
        <div className="elementor-element elementor-element-b78d097 e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-139fcc6 elementor-widget elementor-widget-heading">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  <span style={{color: "#3B99C7"}}>FAQ</span> - Perguntas frequentes
                </h2>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="elementor-element elementor-element-d5eea8a e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-9be6889 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-ecad0d4 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">Qual é a forma de pagamento?</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-8a8cf7f elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">+</h2>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-647246a elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">Você pode fazer o pagamento pelo pix ou cartão de crédito.</h2>
                </div>
              </div>
            </div>

            <div className="elementor-element elementor-element-8bfdb9f e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-7af99b2 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-421c396 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">O pagamento é seguro?</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-feb5b18 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">+</h2>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-9a8cac4 elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">Sim, o pagamento é 100% seguro, onde utilizamos uma das maiores plataformas de vendas do mundo, a Kiwify.</h2>
                </div>
              </div>
            </div>

            <div className="elementor-element elementor-element-632eae9 e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-7b7c895 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-09779e2 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">Funciona para mim?</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-17354ac elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">+</h2>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-752ad0d elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">Sim, o pack MedBio funciona para qualquer clínica ou profissional da saúde, com templates editáveis e personalizados para você copiar e colar.</h2>
                </div>
              </div>
            </div>

            <div className="elementor-element elementor-element-73a0a3f e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-f23e5cf e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-ad02c45 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">Tem garantia?</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-5fd1f40 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">+</h2>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-a9a5c6b elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">Sim, o pack MedBio possui 7 dias de garantia incondicional. Caso você não goste, devolvemos o seu investimento sem burocracia.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção CTA Final */}
        <div className="elementor-element elementor-element-02263bd elementor-widget elementor-widget-button">
          <div className="elementor-widget-container">
            <div className="elementor-button-wrapper">
              <a className="elementor-button elementor-button-link elementor-size-sm" href="https://pay.kiwify.com.br/CZzpbxv">
                <span className="elementor-button-content-wrapper">
                  <span className="elementor-button-text">Garanta o Pack MedBio por apenas R$37!</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Aviso Legal */}
        <div className="elementor-element elementor-element-1012d4cd e-flex e-con-boxed e-con e-parent">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-42c80578 elementor-widget__width-initial elementor-widget elementor-widget-text-editor">
              <div className="elementor-widget-container">
                <p><b>Aviso Legal</b>: "Esse produto é comercializado com apoio da Kiwify. A plataforma não faz controle editorial prévio dos produtos comercializados, nem avalia a tecnicidade e experiência daqueles que os produzem. A existência de um produto e sua aquisição, por meio da plataforma, não podem ser consideradas garantia de qualidade de conteúdo e resultado, em qualquer hipótese. Ao adquiri-lo, o comprador declara estar ciente dessas informações. Os termos e políticas da Kiwify podem ser acessados aqui, antes mesmo da conclusão da compra."</p>
                <p>"Nenhuma informação contida neste produto deve ser interpretada como uma afirmação da obtenção de resultados. Qualquer referência ao desempenho passado ou potencial de uma estratégia abordada no conteúdo não é, e não deve ser interpretada como uma recomendação ou como garantia de qualquer resultado específico."</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scripts do final do body */}
      <Script id="jquery" strategy="beforeInteractive" src="https://eixo.digital/wp-includes/js/jquery/jquery.min.js" />
      
      <Script id="elementor-scripts" strategy="afterInteractive" src="https://eixo.digital/wp-content/litespeed/js/1af24f85f5f4eb6be898f6a16d802f03.js" />

      <Script id="litespeed-js" strategy="afterInteractive">
        {`
          const litespeed_ui_events = ["mouseover", "click", "keydown", "wheel", "touchmove", "touchstart"];
          var urlCreator = window.URL || window.webkitURL;
          
          function litespeed_load_delayed_js_force() {
            console.log("[LiteSpeed] Start Load JS Delayed");
            litespeed_ui_events.forEach(e => {
              window.removeEventListener(e, litespeed_load_delayed_js_force, { passive: true });
            });
            document.querySelectorAll("iframe[data-litespeed-src]").forEach(e => {
              e.setAttribute("src", e.getAttribute("data-litespeed-src"));
            });
            "loading" == document.readyState ? window.addEventListener("DOMContentLoaded", litespeed_load_delayed_js) : litespeed_load_delayed_js();
          }

          litespeed_ui_events.forEach(e => {
            window.addEventListener(e, litespeed_load_delayed_js_force, { passive: true });
          });

          async function litespeed_load_delayed_js() {
            let t = [];
            document.querySelectorAll('script[type="litespeed/javascript"]').forEach(e => {
              t.push(e);
            });
            for (var d in t) await new Promise(e => litespeed_load_one(t[d], e));
            document.dispatchEvent(new Event("DOMContentLiteSpeedLoaded"));
            window.dispatchEvent(new Event("DOMContentLiteSpeedLoaded"));
          }

          function litespeed_load_one(t, e) {
            console.log("[LiteSpeed] Load ", t);
            var d = document.createElement("script");
            d.addEventListener("load", e);
            d.addEventListener("error", e);
            t.getAttributeNames().forEach(e => {
              "type" != e && d.setAttribute("data-src" == e ? "src" : e, t.getAttribute(e));
            });
            let a = !(d.type = "text/javascript");
            !d.src && t.textContent && (d.src = litespeed_inline2src(t.textContent), a = true);
            t.after(d);
            t.remove();
            a && e();
          }

          function litespeed_inline2src(t) {
            try {
              var d = urlCreator.createObjectURL(new Blob([t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm, "$1")], { type: "text/javascript" }));
            } catch (e) {
              d = "data:text/javascript;base64," + btoa(t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm, "$1"));
            }
            return d;
          }
        `}
      </Script>

      <Script id="litespeed-cache" strategy="afterInteractive">
        {`
          var litespeed_vary = document.cookie.replace(/(?:(?:^|.*;\s*)_lscache_vary\s*\=\s*([^;]*).*$)|^.*$/, "");
          if (!litespeed_vary) {
            fetch("/wp-content/plugins/litespeed-cache/guest.vary.php", {
              method: "POST",
              cache: "no-cache",
              redirect: "follow"
            })
            .then(e => e.json())
            .then(e => {
              console.log(e);
              if (e.hasOwnProperty("reload") && e.reload == "yes") {
                sessionStorage.setItem("litespeed_docref", document.referrer);
                window.location.reload(true);
              }
            });
          }
        `}
      </Script>
    </>
  );
}

