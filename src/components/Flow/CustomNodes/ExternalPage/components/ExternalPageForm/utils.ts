export function dinamicHtml(
	background: string,
	text: string,
	borderRadius: string,
	funnelId: string,
	pageId: string
) {
	return `
  <form
  id="ibspf"
  method="post"
  class="gjs-selected"
  style="width: auto; left: 857px; top: 481px"
>
  <span id="funnelId" style="display: none">${funnelId}</span>
  <span id="pageId" style="display: none">${pageId}</span>
  <span id="inuzq" style="display: grid; margin-bottom: 16px"
    ><label id="ip6p5" class="" style="font-size: 16px; color: #000">Nome</label
    ><input
      id="i9hll"
      type="text"
      name="name"
      class=""
      style="
        border: 1px solid rgb(163, 186, 198);
        border-radius: ${borderRadius}px;
        height: 36px;
      "
    /><span id="iqioz" class="warning-name">Campo obrigatório</span></span
  ><span id="iee07" style="display: grid; margin-bottom: 16px"
    ><label id="itbiu" style="font-size: 16px; color: #000">E-mail</label
    ><input
      id="ieujb"
      type="email"
      name="email"
      style="
        border: 1px solid rgb(163, 186, 198);
        border-radius: ${borderRadius}px;
        height: 36px;
      "
    /><span id="i5bzh" class="warning-email">Campo obrigatório</span></span
  ><span id="ijdex" style="display: grid; margin-bottom: 16px"
    ><label id="iwy18" style="font-size: 16px; color: #000">WhatsApp</label
    ><input
      id="i0ql6"
      type="text"
      name="whatsApp"
      maxlength="15"
      style="
        border: 1px solid rgb(163, 186, 198);
        border-radius: ${borderRadius}px;
        height: 36px;
      "
    /><span id="idhj1" class="warning-whatsApp">Campo obrigatório</span></span
  ><span id="il7yk" style="display: grid; margin-bottom: 16px"
    ><button
      id="buttonForm"
      type="button"
      style="
        font-size: 14px;
        background-color: ${background};
        border-radius: ${borderRadius}px;
        cursor: pointer;
        padding: 10px 20px;
        border: none;
        color: #fff;
      "
    >
      <span
        id="buttonForm-span"
        style="font-size: 16px; color: #fff; font-family: Arial"
        >${text}</span
      >
    </button></span
  >
  <div id="i0s3g">
    <span
      id="iye5z"
      class="msg-success"
      style="display: none; color: #29cb39; margin-top: 10px; font-size: 14px"
      >Formulário enviado com sucesso.</span
    ><span
      id="i5p9c"
      class="msg-error"
      style="display: none; color: #ff6969; margin-top: 10px; font-size: 14px"
      >Houve um problema ao enviar o formulário, tente novamente.</span
    >
  </div>
</form>
  `
}

export function dinamicJS(redirectUrl?: string) {
	return `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/cleave.js/1.6.0/cleave.min.js"></script>
<script type="text/javascript">
        function generateRandomString(length) {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let randomString = '';

			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				randomString += characters.charAt(randomIndex);
			}

			return randomString;
		}

		function setCookie(name, value) {
			const expires = 'Fri, 31 Dec 9999 23:59:59 GMT';
			document.cookie = \`\${name}=\${value};expires=\${expires};path=/\`;
		}

		function getCookie(name) {
			const cookieName = \`\${name}=\`;
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				let cookie = cookies[i].trim();
				if (cookie.indexOf(cookieName) === 0) {
					return cookie.substring(cookieName.length, cookie.length);
				}
			}
			return null;
		}

		function cookieExists(name) {
			return getCookie(name) !== null
		}

		const button = document.getElementById("buttonForm");
		const textSpan = document.getElementById("buttonForm-span");
		button?.addEventListener("click", function(event) {
			button.disabled = true;
			textSpan.setAttribute('data-disabled', 'true');
			button.style.cursor = 'progress';
			const target = event.target;
			const form = target.parentElement?.parentElement;
			const redirectURL = "${redirectUrl ?? null}";
			const inputs = form?.querySelectorAll("input");
			const name = form?.querySelector(".warning-name");
			const email = form?.querySelector(".warning-email");
			const whatsApp = form?.querySelector(".warning-whatsApp");
			const msgError = form?.querySelector('.msg-error')
			const msgSuccess = form?.querySelector('.msg-success')

			const values = {
				name: "",
				email: "",
				whatsApp: "",
			};

			inputs?.forEach((input) => {
				const name = input.name;
				const value = input.value;
				if (name) {
					values[name] = value;
				}
			});

			if (!values.email || !values.whatsApp) {
				if (name !== null) {
					if (!values.name) {
						name.style.display = 'block'
						name.style.color = '#ff6969'
					} else {
						name.style.display = 'none'
					}
				}

				if (!values.email) {
					email.style.display = "block";
					email.style.color = "#ff6969";
				} else {
					email.style.display = "none";
				}

				if (!values.whatsApp) {
					whatsApp.style.display = "block";
					whatsApp.style.color = "#ff6969";
				} else {
					whatsApp.style.display = "none";
				}
				
				button.disabled = false;
				button.style.cursor = 'pointer';

				return;
			}

			if (name !== null) {
				name.style.display = 'none'
			}
			email.style.display = "none";
			whatsApp.style.display = "none";

			const leadRef = getCookie("leadRef");

			if (leadRef) {
				const funnelId = document.querySelector("#funnelId")?.textContent;
				const pageId = document.querySelector("#pageId")?.textContent;

				let valueName
				if (values.name) {
					valueName = values.name
				} else {
					valueName = null
				}

				const payloadData = {
					leadRef: leadRef,
					name: valueName,
					email: values.email,
					telephone: values.whatsApp,
					pageId: pageId,
					funnelId: funnelId,
				};

				fetch(\`${import.meta.env.VITE_UPFUNNELS_API}/leads\`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payloadData),
				})
					.then((response) => {
						if (!response.ok) {
							response.json().then((errorData) => {
								if (errorData?.error?.includes("duplicate")) {
									msgError.innerText = "Formulário já foi enviado."
									msgError.style.display = 'block'
									msgSuccess.style.display = 'none'
									button.disabled = false;
									button.style.cursor = 'pointer';
								} else {
									msgError.style.display = 'block'
									msgSuccess.style.display = 'none'
									button.disabled = false;
									button.style.cursor = 'pointer';
								}
							});
						} else {
							msgError.style.display = 'none'

							if (redirectURL) {
								msgSuccess.textContent = 'Formulário enviado com sucesso. Você será redirecionado em instantes';
								msgSuccess.style.display = 'block'
								
								setTimeout(() => {
									window.location.href = redirectURL;
									msgSuccess.style.display = 'block'
									button.disabled = false;
									button.style.cursor = 'pointer';
								}, 3000);
							} else {
								msgSuccess.style.display = 'block'
								button.disabled = false;
								button.style.cursor = 'pointer';
							}
						}
					})
					.catch((error) => {
						msgError.style.display = 'block'
						msgSuccess.style.display = 'none'
						button.disabled = false;
						button.style.cursor = 'pointer';
						console.log(error)
					});
			} else {
				msgError.style.display = 'block'
				msgSuccess.style.display = 'none'
				button.disabled = false;
				button.style.cursor = 'pointer';
			}
		});

		textSpan?.addEventListener("click", function(event) {
			if (textSpan.getAttribute('data-disabled') === "true" || button.disabled) {
				return
			}

			button.disabled = true;
			textSpan.setAttribute('data-disabled', 'true');
			button.style.cursor = 'progress';
			const target = event.target;
			const form = target.parentElement?.parentElement?.parentElement;
			const redirectURL = "${redirectUrl ?? null}";
			const inputs = form?.querySelectorAll("input");
			const name = form?.querySelector(".warning-name");
			const email = form?.querySelector(".warning-email");
			const whatsApp = form?.querySelector(".warning-whatsApp");
			const msgError = form?.querySelector('.msg-error')
			const msgSuccess = form?.querySelector('.msg-success')

			const values = {
				name: "",
				email: "",
				whatsApp: "",
			};

			inputs?.forEach((input) => {
				const name = input.name;
				const value = input.value;
				if (name) {
					values[name] = value;
				}
			});

			if (!values.email || !values.whatsApp) {
				if (name !== null) {
					if (!values.name) {
						name.style.display = 'block'
						name.style.color = '#ff6969'
					} else {
						name.style.display = 'none'
					}
				}

				if (!values.email) {
					email.style.display = "block";
					email.style.color = "#ff6969";
				} else {
					email.style.display = "none";
				}

				if (!values.whatsApp) {
					whatsApp.style.display = "block";
					whatsApp.style.color = "#ff6969";
				} else {
					whatsApp.style.display = "none";
				}

				button.disabled = false;
				button.style.cursor = 'pointer';

				return;
			}

			if (name !== null) {
				name.style.display = 'none'
			}
			email.style.display = "none";
			whatsApp.style.display = "none";

			const leadRef = getCookie("leadRef");

			if (leadRef) {
				const funnelId = document.querySelector("#funnelId")?.textContent;
				const pageId = document.querySelector("#pageId")?.textContent;

				let valueName
				if (values.name) {
					valueName = values.name
				} else {
					valueName = null
				}

				const payloadData = {
					leadRef: leadRef,
					name: valueName,
					email: values.email,
					telephone: values.whatsApp,
					pageId: pageId,
					funnelId: funnelId,
				};

				fetch(\`${import.meta.env.VITE_UPFUNNELS_API}/leads\`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payloadData),
				})
					.then((response) => {
						if (!response.ok) {
						response.json().then((errorData) => {
								if (errorData?.error?.includes("duplicate")) {
									msgError.innerText = "Formulário já foi enviado."
									msgError.style.display = 'block'
									msgSuccess.style.display = 'none'
									button.disabled = false;
									button.style.cursor = 'pointer';
								} else {
									msgError.style.display = 'block'
									msgSuccess.style.display = 'none'
									button.disabled = false;
									button.style.cursor = 'pointer';
								}
							});
						} else {
							msgError.style.display = 'none'

							if (redirectURL) {
								msgSuccess.textContent = 'Formulário enviado com sucesso. Você será redirecionado em instantes';
								msgSuccess.style.display = 'block'
								
								setTimeout(() => {
									window.location.href = redirectURL;
									msgSuccess.style.display = 'block'
									button.disabled = false;
									button.style.cursor = 'pointer';
								}, 3000);
							} else {
								msgSuccess.style.display = 'block'
								button.disabled = false;
								button.style.cursor = 'pointer';
							}
						}
					})
					.catch((error) => {
						msgError.style.display = 'block'
						msgSuccess.style.display = 'none'
						button.disabled = false;
						button.style.cursor = 'pointer';
					});
			} else {
				msgError.style.display = 'block'
				msgSuccess.style.display = 'none'
				button.disabled = false;
				button.style.cursor = 'pointer';
			}
		});

    window.onload = function() {
			const form = document.querySelector("form");

			if (form) {
				const name = document.querySelector(".warning-name");
				const email = document.querySelector(".warning-email");
				const whatsApp = document.querySelector(".warning-whatsApp");
				const msgError = document.querySelector('.msg-error')
				const msgSuccess = document.querySelector('.msg-success')

				name.style.display = 'none'
				email.style.display = 'none'
				whatsApp.style.display = 'none'
				msgError.style.display = 'none'
				msgSuccess.style.display = 'none'
			}

			if (!cookieExists('leadRef')) {
				const randomString = generateRandomString(64);
				setCookie('leadRef', randomString)
			}
		}
</script>
<script>
    new Cleave("input[name='whatsApp']", {
        delimiters: ['(', ') ', '-'],
        blocks: [0, 2, 5, 4],
        numericOnly: true   
    });
</script>
  `
}
