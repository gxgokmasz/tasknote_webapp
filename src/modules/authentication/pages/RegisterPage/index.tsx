import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { useIdentifier } from "../../../../hooks/useIdentifier";
import { signUp } from "../../services";
import * as Styled from "./styles";

const signUpFormSchema = z
  .object({
    username: z.string().min(1, "O campo nome de usuário não pode estar vazio"),
    email: z
      .string()
      .min(1, "O campo email não pode estar vazio")
      .email("Endereço de email inválido."),
    password1: z.string(),
    password2: z.string(),
  })
  .refine((data) => data.password1 == data.password2, {
    message: "As senhas não correspondem.",
    path: ["password2"],
  })
  .refine((data) => data.password1.length >= 8 || data.password2.length >= 8, {
    message: "A senha deve conter no mínimo 8 caracteres.",
    path: ["password2"],
  });

type NewUserFormData = z.infer<typeof signUpFormSchema>;

export const RegisterPage = () => {
  const { handleSubmit, register } = useForm<NewUserFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  const navigate = useNavigate();

  const [usernameId, emailId, password1Id, password2Id] = useIdentifier([
    "username",
    "email",
    "password1",
    "password2",
  ]);

  const handleSignUp = async (data: Omit<NewUserFormData, "password1">) => {
    const { username, email, password2 } = data;

    toast.dismiss();

    const response = await toast.promise(signUp(username, email, password2), {
      pending: "Carregando",
    });

    if (response.data) {
      toast.success("Usuário criado com sucesso!");
      navigate("/login");

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
    <Styled.RegisterPageContainer>
      <Styled.FormWrapper>
        <Styled.FormContainer
          onSubmit={handleSubmit(handleSignUp, (errors) => {
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
            <label htmlFor={emailId}>Email:</label>
            <Styled.FormInput
              type="text"
              required
              id={emailId}
              {...register("email")}
            />
          </Styled.FormGroup>

          <Styled.FormGroup>
            <label htmlFor={password1Id}>Senha:</label>
            <Styled.FormInput
              type="password"
              required
              id={password1Id}
              {...register("password1")}
            />
          </Styled.FormGroup>

          <Styled.FormGroup>
            <label htmlFor={password2Id}>Confirmar senha:</label>
            <Styled.FormInput
              type="password"
              required
              id={password2Id}
              {...register("password2")}
            />
          </Styled.FormGroup>

          <Styled.FormGroup>
            <Styled.FormSubmitButton type="submit">Enviar</Styled.FormSubmitButton>
          </Styled.FormGroup>
        </Styled.FormContainer>

        <Styled.LinksContainer>
          <span>
            Já tem uma conta?<Styled.Link to="/login">Entrar</Styled.Link>
          </span>
        </Styled.LinksContainer>
      </Styled.FormWrapper>
    </Styled.RegisterPageContainer>
  );
};
