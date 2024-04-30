import React from "react";
import styles from "./HomeCard.module.scss";
import calendar from "./../../assets/gif/calendar.gif";
import document from "./../../assets/gif/animation_200_li8xt2um.gif";
import messenger from "./../../assets/gif/messenger.gif";
import statistic from "./../../assets/gif/statistic.gif";
import task from "./../../assets/gif/task.gif";
import support from "./../../assets/gif/support.gif";
import indiv from "./../../assets/gif/indiv.gif";
import update from "./../../assets/gif/update.gif";
import unet from "./../../assets/img/UNET.png";
const HomeCard = () => {
  return (
    <div className={styles.home_card_global_wrapper}>
      <div className={styles.five_image}> </div>

      <div className={styles.home_card_wrapper}>
        <header className={`${styles.header} ${styles.fixed}`}>
          <div className={styles.header_inner}>
            <div className={styles.logo}>
              <img src={unet} alt="" />
            </div>
            <div className={styles.buttons}>
              <button className={styles.consultation_button2}>
                Консультация
              </button>
              <button className={styles.free_trial_button}>
                Попробовать бесплатно
              </button>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <h1 style={{ fontSize: "35px" }}>
            Автоматизация вашего рабочего процесса
          </h1>
          <p>
            Назначение задач каждому сотруднику, вести обсуждение в рабочее
            время в личном мессенджере, автоматизировать оборот документов и их
            согласование и многое другое в нашей системе.
          </p>
          <div className={styles.buttons}>
            <button className={styles.contact_button}>Связаться</button>
            <button className={styles.details_button}>Подробнее</button>
          </div>
          <div className={styles.first_image}></div>
        </section>

        <div className={styles.five_image}>
          {" "}
          <section className={styles.section}>
            <h2>Что есть в системе?</h2>
            <div className={styles.video}></div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.gif}>
                  <img src={task} style={{ width: "130px" }} alt="Гифка 1" />
                </div>
                <h1>Возможности в задачах</h1>
                <p>
                  Наш сервис позволяет назначать задачи сотрудникам с
                  определенными сроками выполнения. Вы можете легко создавать
                  задачи, указывать сроки и отслеживать их выполнение, что
                  помогает организовать работу команды и достичь поставленных
                  целей.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.gif}>
                  <img
                    src={calendar}
                    style={{ width: "130px" }}
                    alt="Гифка 2"
                  />
                </div>
                <h1>Календарь</h1>
                <p>
                  Мы обеспечиваем надежную конфиденциальность в нашей системе,
                  чтобы защитить ваши данные. Мы также предоставляем анонимный
                  чат, чтобы обеспечить безопасную и защищенную коммуникацию.
                  Кроме того, наша платформа имеет плавную архитектуру,
                  обеспечивающую стабильное и эффективное функционирование.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.gif}>
                  <img
                    src={document}
                    style={{ width: "130px" }}
                    alt="Гифка 3"
                  />
                </div>
                <h1>Обращения и документооборот</h1>
                <p>
                  Наш сервис предоставляет возможность удобно обрабатывать и
                  хранить документы. Вы можете загружать, организовывать и
                  искать документы в одном месте, что облегчает и ускоряет
                  работу с ними.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.gif}>
                  <img
                    src={messenger}
                    style={{ width: "150px" }}
                    alt="Гифка 4"
                  />
                </div>
                <h1>Мессенджер</h1>
                <p>
                  Наш мессенджер предоставляет удобное средство коммуникации и
                  сотрудничества внутри организации. Вы сможете обмениваться
                  сообщениями и поддерживать эффективное взаимодействие с
                  коллегами.
                </p>
              </div>
              <div
                className={styles.card}
                style={{ width: "calc(25% - -880px)" }}
              >
                <div className={styles.gif}>
                  <img
                    src={statistic}
                    style={{ width: "90px" }}
                    alt="Гифка 5"
                  />
                </div>
                <h1>Статистика и эффективность</h1>
                <p>
                  Мы предоставляем возможность отслеживать статистику, связанную
                  с эффективностью работы, уровнем удовлетворенности сотрудников
                  и последними действиями на сайте. Это позволяет анализировать
                  производительность, выявлять тренды и принимать обоснованные
                  решения для улучшения работы организации.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className={styles.four_image}>
          <section className={styles.section}>
            <div className={styles.left}>
              <h2>Что Вы получите при сотрудничестве?</h2>
            </div>
            <div className={styles.right}>
              <div className={styles.card2}>
                <div className={styles.icon}>
                  {" "}
                  <img
                    src={update}
                    style={{ maxWidth: "150px" }}
                    alt="Гифка 5"
                  />
                </div>
                <h3>Регулярные обновления</h3>
                <p>
                  Мы постоянно работаем над внедрением инноваций, чтобы
                  обеспечить вас современными и эффективными функциями.
                </p>
              </div>
              <div className={styles.card2}>
                <div className={styles.icon}>
                  {" "}
                  <img
                    src={indiv}
                    style={{ maxWidth: "150px" }}
                    alt="Гифка 5"
                  />
                </div>
                <h3>Индивидуальный подход</h3>
                <p>
                  Разработаем и настроим специфическую логику, полностью
                  соответствующую потребностям вашей компании
                </p>
              </div>
              <div className={styles.card2}>
                <div className={styles.icon}>
                  {" "}
                  <img
                    src={support}
                    style={{ maxWidth: "150px" }}
                    alt="Гифка 5"
                  />{" "}
                </div>
                <h3>Поддержка 24/7</h3>
                <p>
                  Наши операторы всегда готовы помочь и ответить на ваши вопросы
                  или решить возникшие трудности.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            {/* Здесь разместите содержимое четвертой секции */}
            <div className={styles.card}>
              <div className={styles.piechart}>Диаграмма 1</div>
              <h3>Заголовок 1</h3>
              <p>Описание 1</p>
            </div>
            <div className={styles.card}>
              <div className={styles.piechart}>Диаграмма 2</div>
              <h3>Заголовок 2</h3>
              <p>Описание 2</p>
            </div>
            <div className={styles.card}>
              <div className={styles.piechart}>Диаграмма 3</div>
              <h3>Заголовок 3</h3>
              <p>Описание 3</p>
            </div>
            <div className={styles.card}>
              <div className={styles.piechart}>Диаграмма 4</div>
              <h3>Заголовок 4</h3>
              <p>Описание 4</p>
            </div>
          </section>
        </div>
        <div className={styles.five_image}>
          <section className={styles.section}>
            {/* Здесь разместите содержимое пятой секции */}
            <div className={styles.card2} style={{ width: "unset" }}>
              <h2>Кто мы?</h2>
              <p>
                Мы — команда опытных разработчиков, специализирующихся на
                создании микросервисов и полнофункциональной системы для
                документооборота. Наша система включает согласование, систему
                задач, личный чат и обеспечивает 24/7 поддержку.
              </p>
              <p>
                Мы предлагаем широкий спектр функциональных возможностей для
                упрощения управления документами в вашей компании. Наш модуль
                согласования документов позволяет создавать, отправлять и
                отслеживать документы на различных этапах согласования. Система
                задач помогает организовывать и управлять задачами,
                устанавливать сроки, отслеживать прогресс и назначать
                ответственных. Личный чат обеспечивает эффективную коммуникацию
                между участниками проекта.
              </p>
              <p>
                Мы гарантируем высокое качество разработки и безопасность вашей
                системы. Мы следуем передовым стандартам безопасности, проводим
                тщательное тестирование для обеспечения стабильности и
                надежности системы.
              </p>
              <p>
                Наши услуги включают полное обучение и поддержку при
                использовании системы. Мы проводим обучающие сессии и
                предоставляем документацию, чтобы вы и ваша команда могли быстро
                освоить все функции и возможности.
              </p>
              <p>
                Мы стремимся к долгосрочным партнерским отношениям, готовы
                поддерживать и развивать вашу систему в соответствии с вашими
                потребностями. Будем надежными партнерами, предоставляя вам
                инновационные решения и постоянную поддержку.
              </p>
              <div className={styles.bottom}>
                <button className={styles.try_free_button}>
                  Попробовать бесплатно
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className={`${styles.footer} ${styles.fixed}`}>
          <div className={styles.footer_left}>
            <h2 style={{ color: "white" }}>Заинтересовала система?</h2>
            <h2 style={{ color: "white" }}>У вас остались вопросы?</h2>
          </div>
          <div className={styles.footer_right}>
            <button className={styles.consultation_button}>
              Получить бесплатную консультацию
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomeCard;
