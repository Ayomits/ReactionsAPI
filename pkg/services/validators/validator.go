package validators

import (
	"reactions-api/pkg/responses"
	"reflect"
	"strings"
	"github.com/go-playground/validator/v10"
)

type AppValidator struct {
	validate *validator.Validate `validate:"required"`
}

func NewAppValidator() AppValidator {
	return AppValidator{
		validate: validator.New(),
	}
}

func (f *AppValidator) Validate(err error, body any) *responses.ValidationError {
	var violations []responses.Violation

	if err == nil {
		return nil
	}

	for _, violation := range err.(validator.ValidationErrors) {
		violations = append(violations, *responses.NewViolation(f.getJSONFieldName(violation, body), f.formatErrorMessage(violation)))
	}

	return responses.NewValidationError("Validation error", violations)
}

func (f *AppValidator) getJSONFieldName(fieldErr validator.FieldError, body any) string {
	t := reflect.TypeOf(body)

	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}

	field, found := t.FieldByName(fieldErr.Field())
	if !found {
		return fieldErr.Field()
	}

	jsonTag := field.Tag.Get("json")
	if jsonTag == "" {
		return fieldErr.Field()
	}

	return strings.Split(jsonTag, ",")[0]
}

func (f *AppValidator) formatErrorMessage(fieldErr validator.FieldError) string {
	return fieldErr.Error()
}

var AppValidatorInstance AppValidator = NewAppValidator()