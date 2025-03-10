"use client"

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <style jsx global>{`
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
        .elementor-heading-title {
          padding: 0;
          margin: 0;
          line-height: 1;
        }
        .elementor-widget-heading .elementor-heading-title {
          color: var(--e-global-color-text);
          font-family: var(--e-global-typography-primary-font-family),Sans-serif;
          font-weight: var(--e-global-typography-primary-font-weight);
        }
        .elementor-widget-heading .elementor-heading-title.elementor-size-default {
          font-size: 1.5em;
        }
        .elementor-widget-image {
          text-align: center;
        }
        .elementor-widget-image img {
          vertical-align: middle;
          display: inline-block;
        }
        .elementor-section {
          position: relative;
        }
        .elementor-container {
          display: flex;
          margin-right: auto;
          margin-left: auto;
          position: relative;
        }
        .elementor-column {
          position: relative;
          min-height: 1px;
          display: flex;
        }
        .elementor-column-gap-default>.elementor-column>.elementor-element-populated {
          padding: 10px;
        }
        .elementor-column-gap-extended>.elementor-column>.elementor-element-populated {
          padding: 15px;
        }
        .elementor-widget:not(:last-child) {
          margin-bottom: 20px;
        }
        .elementor-element.elementor-button-align-center .elementor-field-type-submit {
          justify-content: center;
        }
        .elementor-form .elementor-button {
          padding-top: 0;
          padding-bottom: 0;
          border: none;
        }
        .elementor-form .elementor-button>span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .elementor-form .elementor-button.elementor-size-sm {
          min-height: 40px;
        }
      `}</style>

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

      {/* Scripts */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            !function(e,t){"use strict";function a(){t.body.classList.add("litespeed_lazyloaded")}function n(){console.log("[LiteSpeed] Start Lazy Load Images"),d=new LazyLoad({elements_selector:"[data-lazyloaded]",callback_finish:a}),o=function(){d.update()},e.MutationObserver&&new MutationObserver(o).observe(t.documentElement,{childList:!0,subtree:!0,attributes:!0})}var d,o;e.addEventListener?e.addEventListener("load",n,!1):e.attachEvent("onload",n)}(window,document);
          `
        }}
      />

      <script 
        dangerouslySetInnerHTML={{
          __html: `
            var litespeed_vary=document.cookie.replace(/(?:(?:^|.*;\s*)_lscache_vary\s*\=\s*([^;]*).*$)|^.*$/,"");litespeed_vary||fetch("/wp-content/plugins/litespeed-cache/guest.vary.php",{method:"POST",cache:"no-cache",redirect:"follow"}).then(e=>e.json()).then(e=>{console.log(e),e.hasOwnProperty("reload")&&"yes"==e.reload&&(sessionStorage.setItem("litespeed_docref",document.referrer),window.location.reload(!0))});
          `
        }}
      />
    </main>
  );
}

