import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PiCheck, PiEye, PiEyeClosed } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { useIdentifier } from "../../../../hooks/useIdentifier";
import { useToggle } from "../../../../hooks/useToggle";
import { useAuthenticationState } from "../../hooks/useAuthenticationState";
import { signIn } from "../../services";
import * as Styled from "./styles";

const signInFormSchema = z.object({
  username: z.string().min(1, "O campo nome de usuário não pode estar vazio"),
  password: z.string().min(1, "O campo senha não pode estar vazio"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof signInFormSchema>;

export const LoginPage = () => {
  const { handleSubmit, register, control } = useForm<LoginFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const navigate = useNavigate();

  const { executeSignIn } = useAuthenticationState({ onlyActions: true });

  const [usernameId, passwordId, rememberMeId] = useIdentifier([
    "username",
    "password",
    "rememberMe",
  ]);

  const [isPasswordVisible, handleChangePasswordVisibility] = useToggle(false);

  const handleSignIn = async (data: LoginFormData) => {
    const { username, password, rememberMe } = data;

    toast.dismiss();

    const response = await toast.promise(signIn(username, password), {
      pending: "Carregando",
    });

    if (response.data) {
      executeSignIn(response.data, rememberMe);
      toast.success("Usuário autenticado com sucesso!");
      navigate("/");

      return;
    }

    if (response.error.data) {
      const errors = response.error.data;

      Object.values(errors).forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((error) => toast.error(error));
        } else if (typeof value == "string") {
          toast.error(value);
        }
      });

      return;
    }
  };

  return (
    <Styled.LoginPageContainer>
      <Styled.FormWrapper>
        <Styled.FormContainer
          onSubmit={handleSubmit(handleSignIn, (errors) => {
            Object.values(errors).forEach((error) => {
              toast.error(error.message);
            });

            return;
          })}
        >
          <Styled.FormGroup>
            <label htmlFor={usernameId}>Nome de usuário:</label>
            <Styled.FormInput
              type="text"
              required
              id={usernameId}
              {...register("username")}
            />
          </Styled.FormGroup>

          <Styled.FormGroup>
            <label htmlFor={passwordId}>Senha:</label>
            <Styled.FormInput
              required
              id={passwordId}
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
            />
            <Styled.VisibilityButton
              type="button"
              onClick={handleChangePasswordVisibility}
            >
              {isPasswordVisible ? <PiEye size={24} /> : <PiEyeClosed size={24} />}
            </Styled.VisibilityButton>
          </Styled.FormGroup>

          <Styled.FormGroup $isRememberMeGroup>
            <label htmlFor={rememberMeId}>Lembrar de mim?</label>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field }) => (
                <Styled.RememberMe
                  id={rememberMeId}
                  onCheckedChange={field.onChange}
                >
                  <Styled.RememberMeButton>
                    <PiCheck size={20} />
                  </Styled.RememberMeButton>
                </Styled.RememberMe>
              )}
            />
          </Styled.FormGroup>

          <Styled.FormGroup>
            <Styled.FormSubmitButton type="submit">Enviar</Styled.FormSubmitButton>
          </Styled.FormGroup>
        </Styled.FormContainer>

        <Styled.LinksContainer>
          <span>
            Não tem uma conta?<Styled.Link to="/register">Cadastrar-se</Styled.Link>
          </span>
        </Styled.LinksContainer>
      </Styled.FormWrapper>
    </Styled.LoginPageContainer>
  );
};
